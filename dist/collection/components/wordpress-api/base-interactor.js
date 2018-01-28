var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Dexie from 'dexie';
import { WordPressApiError } from './base-api';
export class BaseInteractor {
    constructor(db, subject) {
        this.batchCount = 100;
        this.endpoint = "/";
        this.singular = "Items";
        this.plural = "Item";
        this.db = db;
        this.subject = subject;
    }
    /**
     * returns the current state of the leader and follow relationship
     */
    compareState() {
        return __awaiter(this, void 0, void 0, function* () {
            let follower = yield this.subject.count();
            let leader = yield this.api.count();
            console.debug(this.endpoint, { "Follower": follower, "Leader": leader });
            return follower === leader;
        });
    }
    /**
     * Pulls the count from the Database.
     * @return {Promise<number>} The count in the database
     */
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.subject.count();
        });
    }
    /**
     * Loads all items from the database.
     * @return {Promise<Array>} An array of posts
     */
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.subject.toArray();
        });
    }
    /**
     * Populate the database (follower) from the API (leader)
     * @return {Promise<boolean>} A boolean that returns with the first pass sync
     */
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentPage = 1;
            if (yield this.compareState()) {
                console.debug("Leader and follower are in sync");
            }
            else {
                console.debug("beginning sync...");
                yield this.api.all().then((request) => {
                    this.db.content.put({ type: this.endpoint, count: request.total }).catch(() => { });
                    this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
                        console.debug(`Added ${this.batchCount - e.failures.length} new Users`);
                    });
                    const iterations = Array.apply(null, { length: (request.totalPages - 1) });
                    iterations.forEach(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.api.some({ limit: this.batchCount, page: currentPage++ }).then((request) => {
                            this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
                                console.debug(`Added ${this.batchCount - e.failures.length} new Users`);
                            });
                            return true;
                        });
                        this.compareState();
                    }));
                });
            }
        });
    }
    /**
     * Returns a list of posts. Hits the follower first.
     * @param  {object}  args An object that passes parameters to the REST api
     * @return {Promise<any>}      [description]
     */
    some(args = { limit: 20, offset: 0, page: undefined }) {
        return __awaiter(this, void 0, void 0, function* () {
            args = this.cleanSomeParameters(args);
            return this.subject.offset(args.offset).limit(args.limit).toArray();
        });
    }
    /**
     * Returns a post by the ID. Hits the follower first.
     * @param  {number}       id The id of the post to return.
     * @return {Promise<object>}    Returns the object from the database.
     */
    getByID(id, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let item;
            if (!skipIndexedDB) {
                item = yield this.subject.where("id").equals(id).first();
            }
            if (!item) {
                item = yield this.api.one(id);
                if (item.data.length === 0) {
                    throw new WordPressApiError({ message: "No results" });
                }
                item = item.data;
                this.subject.put(item).catch((e) => { });
            }
            return item;
        });
    }
    /**
     * Returns a post by the ID. Hits the follower first.
     * @param  {number}       id The id of the post to return.
     * @return {Promise<object>}    Returns the object from the database.
     */
    hasNewVersion(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let leader = yield this.api.one(id);
            leader = leader.data;
            const follower = yield this.subject.where("id").equals(id).first();
            return follower.modified !== leader.modified;
        });
    }
    /**
     * Returns a post by the slug. Hits the follower first.
     * @param  {string}       slug The slug of the post to return.
     * @param  {string}       skipIndexedDB Boolean that forces a request to the API.
     * @return {Promise<object>}    Returns the object from the database.
     */
    getBySlug(slug, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let item;
            if (!skipIndexedDB) {
                item = yield this.subject.where("slug").equals(slug).first();
            }
            if (!item) {
                item = yield this.api.get_request({ 'slug': slug });
                if (item.data.length === 0) {
                    throw new WordPressApiError({ message: "No results" });
                }
                item = item.data[0];
                this.subject.put(item).catch((e) => { });
            }
            return item;
        });
    }
    /**
     * Returns a post by the slug. Hits the follower first.
     * @param  {string}       slug The slug of the post to return.
     * @param  {string}       skipIndexedDB Boolean that forces a request to the API.
     * @return {Promise<object>}    Returns the object from the database.
     */
    getByPost(post, parent, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let items;
            if (!skipIndexedDB) {
                items = yield this.subject.where({ "post": post, "parent": parent }).toArray();
            }
            if (!items) {
                items = yield this.api.get_request({ 'post': post, 'parent': parent });
                if (items.data.length === 0) {
                    throw new WordPressApiError({ message: "No results" });
                }
                items = items.data;
                this.subject.bulkPut(items).catch(Dexie.BulkError, (e) => {
                    console.debug(`Added ${this.batchCount - e.failures.length} new Users`);
                });
            }
            for (const [index, item] of items.entries()) {
                try {
                    items[index].thread = yield this.getByPost(post, item.id, skipIndexedDB);
                }
                catch (e) {
                    items[index].thread = [];
                }
            }
            return items;
        });
    }
    /**
     * Create a new item. Returns the new item.
     * @param {object} payload An object that you pass to create the new item.
     */
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.api.create(payload);
            yield this.subject.put(result);
            return result;
        });
    }
    /**
     * Returns a post by the ID. Hits the follower first.
     * @param  {number}       id The id of the post to return.
     * @param  {number}       skipIndexedDB Force a request to the API
     * @return {Promise<object>}    Returns the object from the database.
     */
    getByIDAndPopulate(id, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.getByID(id, skipIndexedDB);
            item = this.makeRich(item, skipIndexedDB);
            return item;
        });
    }
    /**
     * Returns a post by the ID. Hits the follower first.
     * @param  {string}       id The id of the post to return.
     * @param  {number}       skipIndexedDB Force a request to the API
     * @return {Promise<object>}    Returns the object from the database.
     */
    getBySlugAndPopulate(slug, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let item = yield this.getBySlug(slug, skipIndexedDB);
            item = this.makeRich(item, skipIndexedDB);
            return item;
        });
    }
    /**
     * Populates an item with lots of rich content
     * @param  {number}       id The id of the post to return.
     * @param  {number}       skipIndexedDB Force a request to the API
     * @return {Promise<object>}    Returns the object from the database.
     */
    makeRich(item, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let api = window["WordPress"].api;
            // @ts-ignore
            if (item.featured_media && item.featured_media !== 0) {
                // @ts-ignore
                item.featured_media = yield api.media.getByID(item.featured_media, skipIndexedDB);
            }
            if (item.author) {
                // @ts-ignore
                item.author = yield api.users.getByID(item.author, skipIndexedDB);
            }
            if (item.categories) {
                let categories = {};
                // @ts-ignore
                for (let category of item.categories) {
                    categories[category] = yield api.categories.getByID(category, skipIndexedDB);
                }
                // @ts-ignore
                item.categories = categories;
            }
            if (item.post) {
                const post_id = item.post;
                let post;
                post = yield api.posts.getByIDAndPopulate(post_id, skipIndexedDB);
                if (post.data && post.data.status) {
                    post = yield api.pages.getByIDAndPopulate(post_id, skipIndexedDB);
                }
                item.post = post;
            }
            if (item.parent && item.parent !== 0) {
                const subject_id = item.parent;
                let subject;
                if ((item.type === "post" || item.type === "page")) {
                    subject = yield api.posts.getByIDAndPopulate(subject_id, skipIndexedDB);
                    if (subject.data.status) {
                        subject = yield api.pages.getByIDAndPopulate(subject_id, skipIndexedDB);
                    }
                }
                else if (item.type === "comment") {
                    subject = yield api.comments.getByIDAndPopulate(subject_id, skipIndexedDB);
                }
                item.parent = subject;
            }
            return item;
        });
    }
    /**
     * transform an object and turn it into a string
     * @param {someRequestArguments} args An object with the arguments to pass to the API.
     */
    cleanSomeParameters(args = {}) {
        args = Object.assign({ limit: 20, offset: 0, page: undefined }, args);
        if (args.page) {
            args.offset = args.limit * args.page;
        }
        return args;
    }
    isEquivalent(a, b) {
        // Create arrays of property names
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
        // If we made it this far, objects
        // are considered equivalent
        return true;
    }
}

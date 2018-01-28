import Dexie from 'dexie';
import { WordPressApiError } from './base-api';

export class BaseInteractor {
  db: any
  api: any
  subject: any
  batchCount = 100
  endpoint = "/";
  singular = "Items";
  plural = "Item";

  constructor (db, subject) {
    this.db = db;
    this.subject = subject;
  }

  /**
   * returns the current state of the leader and follow relationship
   */
  async compareState() {
    let follower = await this.subject.count();
    let leader = await this.api.count();

    console.debug(this.endpoint, {"Follower": follower, "Leader": leader})

    return follower === leader;
  }

  /**
   * Pulls the count from the Database.
   * @return {Promise<number>} The count in the database
   */
  async count(): Promise<number> {
    return await this.subject.count();
  }

  /**
   * Loads all items from the database.
   * @return {Promise<Array>} An array of posts
   */
  async all(): Promise<Array<any>> {
    return this.subject.toArray();
  }

  /**
   * Populate the database (follower) from the API (leader)
   * @return {Promise<boolean>} A boolean that returns with the first pass sync
   */
  async populate(): Promise<any> {
    let currentPage = 1;

    if (await this.compareState()) {
      console.debug("Leader and follower are in sync")
    } else {
      console.debug("beginning sync...")

      await this.api.all().then((request) => {
        this.db.content.put({type: this.endpoint, count: request.total}).catch(() => {});

        this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
          console.debug(`Added ${this.batchCount-e.failures.length} new Users`);
        });

        const iterations = Array.apply(null, { length: (request.totalPages - 1) });

        iterations.forEach(async () => {
          await this.api.some({limit: this.batchCount, page: currentPage++}).then((request) => {
            this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
              console.debug(`Added ${this.batchCount-e.failures.length} new Users`);
            });

            return true;
          });

          this.compareState()
        });
      });
    }
  }

  /**
   * Returns a list of posts. Hits the follower first.
   * @param  {object}  args An object that passes parameters to the REST api
   * @return {Promise<any>}      [description]
   */
  async some(args: someRequestArguments = {limit: 20, offset: 0, page: undefined}): Promise<any> {
    args = this.cleanSomeParameters(args)
    return this.subject.offset(args.offset).limit(args.limit).toArray();
  }

  /**
   * Returns a post by the ID. Hits the follower first.
   * @param  {number}       id The id of the post to return.
   * @return {Promise<object>}    Returns the object from the database.
   */
  async getByID(id: number, skipIndexedDB: boolean = false): Promise<object> {
    let item;

    if (!skipIndexedDB) {
       item = await this.subject.where("id").equals(id).first();
    }

    if (!item) {
      item = await this.api.one(id);

      if (item.data.length === 0) {
        throw new WordPressApiError({ message: "No results" });
      }

      item = item.data;

      this.subject.put(item).catch((e) => {});
    }

    return item;
  }

  /**
   * Returns a post by the ID. Hits the follower first.
   * @param  {number}       id The id of the post to return.
   * @return {Promise<object>}    Returns the object from the database.
   */
  async hasNewVersion(id: number): Promise<boolean> {
    let leader = await this.api.one(id);
    leader = leader.data;
    const follower = await this.subject.where("id").equals(id).first();
    return follower.modified !== leader.modified
  }

  /**
   * Returns a post by the slug. Hits the follower first.
   * @param  {string}       slug The slug of the post to return.
   * @param  {string}       skipIndexedDB Boolean that forces a request to the API.
   * @return {Promise<object>}    Returns the object from the database.
   */
  async getBySlug(slug: string, skipIndexedDB: boolean = false): Promise<object> {
    let item;

    if (!skipIndexedDB) {
       item = await this.subject.where("slug").equals(slug).first();
    }

    if (!item) {
      item = await this.api.get_request({'slug': slug});

      if (item.data.length === 0) {
        throw new WordPressApiError({ message: "No results" });
      }

      item = item.data[0];
      this.subject.put(item).catch((e) => {});
    }

    return item;
  }

  /**
   * Returns a post by the slug. Hits the follower first.
   * @param  {string}       slug The slug of the post to return.
   * @param  {string}       skipIndexedDB Boolean that forces a request to the API.
   * @return {Promise<object>}    Returns the object from the database.
   */
  async getByPost(post: number, parent: number, skipIndexedDB: boolean = false): Promise<Array<object>> {
    let items;

    if (!skipIndexedDB) {
       items = await this.subject.where({"post": post, "parent": parent}).toArray();
    }

    if (!items) {
      items = await this.api.get_request({'post': post, 'parent': parent});

      if (items.data.length === 0) {
        throw new WordPressApiError({ message: "No results" });
      }

      items = items.data;

      this.subject.bulkPut(items).catch(Dexie.BulkError, (e) => {
        console.debug(`Added ${this.batchCount-e.failures.length} new Users`);
      });
    }

    for (const [index, item] of items.entries()) {
      try {
        items[index].thread = await this.getByPost(post, item.id, skipIndexedDB);
      } catch (e) {
        items[index].thread = [];
      }
    }

    return items;
  }

  /**
   * Create a new item. Returns the new item.
   * @param {object} payload An object that you pass to create the new item.
   */
  async create(payload: object) {
    const result = await this.api.create(payload);
    await this.subject.put(result);
    return result;
  }

  /**
   * Returns a post by the ID. Hits the follower first.
   * @param  {number}       id The id of the post to return.
   * @param  {number}       skipIndexedDB Force a request to the API
   * @return {Promise<object>}    Returns the object from the database.
   */
  async getByIDAndPopulate(id: number, skipIndexedDB: boolean = false): Promise<object> {
    let item = await this.getByID(id, skipIndexedDB);
    item = this.makeRich(item, skipIndexedDB);
    return item;
  }

  /**
   * Returns a post by the ID. Hits the follower first.
   * @param  {string}       id The id of the post to return.
   * @param  {number}       skipIndexedDB Force a request to the API
   * @return {Promise<object>}    Returns the object from the database.
   */
  async getBySlugAndPopulate(slug: string, skipIndexedDB: boolean = false): Promise<object> {
    let item = await this.getBySlug(slug, skipIndexedDB);
    item = this.makeRich(item, skipIndexedDB);
    return item;
  }

  /**
   * Populates an item with lots of rich content
   * @param  {number}       id The id of the post to return.
   * @param  {number}       skipIndexedDB Force a request to the API
   * @return {Promise<object>}    Returns the object from the database.
   */
  async makeRich(item: any, skipIndexedDB: boolean = false) {
    let api = window["WordPress"].api;

    // @ts-ignore
    if (item.featured_media && item.featured_media !== 0) {
      // @ts-ignore
      item.featured_media = await api.media.getByID(item.featured_media, skipIndexedDB);
    }

    if (item.author) {
      // @ts-ignore
      item.author = await api.users.getByID(item.author, skipIndexedDB);
    }

    if (item.categories) {
      let categories = {};

      // @ts-ignore
      for (let category of item.categories) {
        categories[category] = await api.categories.getByID(category, skipIndexedDB);
      }

      // @ts-ignore
      item.categories = categories;
    }

    if (item.post) {
      const post_id = item.post;
      let post;

      post = await api.posts.getByIDAndPopulate(post_id, skipIndexedDB);

      if (post.data && post.data.status) {
        post = await api.pages.getByIDAndPopulate(post_id, skipIndexedDB);
      }

       item.post = post;
    }

    if (item.parent && item.parent !== 0) {
      const subject_id = item.parent;
      let subject;

      if ((item.type === "post" || item.type === "page")) {

        subject = await api.posts.getByIDAndPopulate(subject_id, skipIndexedDB);

        if (subject.data.status) {
          subject = await api.pages.getByIDAndPopulate(subject_id, skipIndexedDB);
        }

       } else if (item.type === "comment") {
         subject = await api.comments.getByIDAndPopulate(subject_id, skipIndexedDB);
       }

       item.parent = subject;
    }

    return item;
  }


  /**
   * transform an object and turn it into a string
   * @param {someRequestArguments} args An object with the arguments to pass to the API.
   */
  cleanSomeParameters (args: someRequestArguments = {}) {
    args = Object.assign({ limit: 20, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return args
  }


  isEquivalent (a: Object, b: Object): boolean {
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

declare interface someRequestArguments {
  limit?: number;
  offset?: number;
  page?: number;
}


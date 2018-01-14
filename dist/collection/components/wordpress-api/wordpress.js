var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Database } from './database';
import { Posts, Pages, Comments, Media, Tags, Categories, Users } from './interactors';
//
// Declare Database
//
export class WordPress {
    constructor(url, name) {
        this.db = new Database(name);
        this.url = url;
        this.posts = new Posts(this.db, this.url);
        this.pages = new Pages(this.db, this.url);
        this.comments = new Comments(this.db, this.url);
        this.media = new Media(this.db, this.url);
        this.tags = new Tags(this.db, this.url);
        this.categories = new Categories(this.db, this.url);
        this.users = new Users(this.db, this.url);
    }
    prepareDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.all([
                this.posts.populate(),
                this.pages.populate(),
                this.comments.populate(),
                this.media.populate(),
                this.tags.populate(),
                this.categories.populate(),
                this.users.populate()
            ]);
        });
    }
}

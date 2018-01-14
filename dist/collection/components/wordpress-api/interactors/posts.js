import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Posts
export class Posts extends BaseInteractor {
    constructor(db, url = "/", nonce) {
        super(db, db.posts);
        this.endpoint = "/posts";
        this.singular = "Post";
        this.plural = "Posts";
        this.api = new PostsAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount,
            nonce
        });
    }
}
// PostsAPI
class PostsAPI extends BaseAPI {
}

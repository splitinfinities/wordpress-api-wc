import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Tags
export class Tags extends BaseInteractor {
    constructor(db, url = "/", nonce) {
        super(db, db.tags);
        this.endpoint = "/tags";
        this.singular = "Post";
        this.plural = "Posts";
        this.api = new TagsAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount,
            nonce
        });
    }
}
// TagsAPI
class TagsAPI extends BaseAPI {
}

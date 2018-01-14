import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Tags
export class Tags extends BaseInteractor {
    constructor(db, url = "/") {
        super(db, db.tags);
        this.endpoint = "/tags";
        this.singular = "Post";
        this.plural = "Posts";
        this.api = new TagsAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount
        });
    }
}
// TagsAPI
class TagsAPI extends BaseAPI {
}

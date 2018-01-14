import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Comments
export class Comments extends BaseInteractor {
    constructor(db, url = "/", nonce) {
        super(db, db.comments);
        this.endpoint = "/comments";
        this.singular = "Comments";
        this.plural = "Comment";
        this.api = new CommentsAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount,
            nonce
        });
    }
}
// CommentsAPI
class CommentsAPI extends BaseAPI {
}

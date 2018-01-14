import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Pages
export class Pages extends BaseInteractor {
    constructor(db, url = "/", nonce) {
        super(db, db.pages);
        this.endpoint = "/pages";
        this.singular = "Page";
        this.plural = "Pages";
        this.api = new PagesAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount,
            nonce
        });
    }
}
// PagesAPI
class PagesAPI extends BaseAPI {
}

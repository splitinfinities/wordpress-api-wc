import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Pages
export class Pages extends BaseInteractor {
  endpoint = "/pages";
  singular = "Page";
  plural = "Pages";

  constructor(db: any, url: string = "/", nonce: string) {
    super(db, db.pages)
    this.api = new PagesAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount,
      nonce
    });
  }
}

// PagesAPI
class PagesAPI extends BaseAPI { }

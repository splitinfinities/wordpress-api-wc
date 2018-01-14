import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Tags
export class Tags extends BaseInteractor {
  endpoint = "/tags";
  singular = "Post";
  plural = "Posts";

  constructor(db: any, url: string = "/") {
    super(db, db.tags)
    this.api = new TagsAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount
    });
  }
}

// TagsAPI
class TagsAPI extends BaseAPI { }

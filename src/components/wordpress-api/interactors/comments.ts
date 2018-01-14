import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Comments
export class Comments extends BaseInteractor {
  endpoint = "/comments";
  singular = "Comments";
  plural = "Comment";

  constructor(db: any, url: string = "/") {
    super(db, db.comments)
    this.api = new CommentsAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount
    });
  }
}

// CommentsAPI
class CommentsAPI extends BaseAPI { }

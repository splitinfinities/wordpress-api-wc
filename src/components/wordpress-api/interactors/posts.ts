import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Posts
export class Posts extends BaseInteractor {
  endpoint = "/posts";
  singular = "Post";
  plural = "Posts";

  constructor(db: any, url: string = "/", nonce: string) {
    super(db, db.posts)
    this.api = new PostsAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount,
      nonce
    });
  }
}

// PostsAPI
class PostsAPI extends BaseAPI { }

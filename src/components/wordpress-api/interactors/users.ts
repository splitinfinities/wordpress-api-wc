import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Users
export class Users extends BaseInteractor {
  endpoint = "/users";
  singular = "Post";
  plural = "Posts";

  constructor(db: any, url: string = "/", nonce: string) {
    super(db, db.users)
    this.api = new UsersAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount,
      nonce
    });
  }
}

// UsersAPI
class UsersAPI extends BaseAPI { }

import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Users
export class Users extends BaseInteractor {
    constructor(db, url = "/") {
        super(db, db.users);
        this.endpoint = "/users";
        this.singular = "Post";
        this.plural = "Posts";
        this.api = new UsersAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount
        });
    }
}
// UsersAPI
class UsersAPI extends BaseAPI {
}

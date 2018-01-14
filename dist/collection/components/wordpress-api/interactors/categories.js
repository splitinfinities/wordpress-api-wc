import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
// Categories
export class Categories extends BaseInteractor {
    constructor(db, url = "/") {
        super(db, db.categories);
        this.endpoint = "/categories";
        this.singular = "Categories";
        this.plural = "Category";
        this.api = new CategoriesAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount
        });
    }
}
// CategoriesAPI
class CategoriesAPI extends BaseAPI {
}

import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';

// Categories
export class Categories extends BaseInteractor {
  endpoint = "/categories";
  singular = "Categories";
  plural = "Category";

  constructor(db: any, url: string = "/", nonce: string) {
    super(db, db.categories)
    this.api = new CategoriesAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount,
      nonce
    });
  }
}

// CategoriesAPI
class CategoriesAPI extends BaseAPI { }

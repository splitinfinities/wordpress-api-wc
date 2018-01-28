var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    getThreads(post, skipIndexedDB = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let comments = yield this.getByPost(post, 0, skipIndexedDB);
            return comments;
        });
    }
}
// CommentsAPI
class CommentsAPI extends BaseAPI {
}

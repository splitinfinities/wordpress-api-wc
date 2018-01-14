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
import Dexie from 'dexie';
// Media
export class Media extends BaseInteractor {
    constructor(db, url = "/") {
        super(db, db.media);
        this.endpoint = "/media";
        this.singular = "Media";
        this.plural = "Media";
        this.api = new MediaAPI({
            url: url,
            endpoint: this.endpoint,
            batchCount: this.batchCount
        });
    }
    populate() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentPage = 1;
            if (yield this.compareState()) {
                console.debug("Leader and follower are in sync");
            }
            else {
                console.debug("beginning sync...");
                yield this.api.all().then((request) => {
                    this.db.content.put({ type: this.endpoint, count: request.totalPages }).catch((e) => { });
                    this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
                        console.debug(`Added ${this.batchCount - e.failures.length} new Media`);
                    });
                    const iterations = Array.apply(null, { length: (request.totalPages - 1) });
                    iterations.forEach(() => __awaiter(this, void 0, void 0, function* () {
                        yield this.api.some({ limit: this.batchCount, page: currentPage++ }).then((request) => {
                            this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
                                console.debug(`Added ${this.batchCount - e.failures.length} new Media`);
                            });
                            return true;
                        });
                        this.compareState();
                    }));
                });
            }
        });
    }
}
// MediaAPI
class MediaAPI extends BaseAPI {
}

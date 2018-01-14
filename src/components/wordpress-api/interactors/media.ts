import { BaseAPI } from '../base-api';
import { BaseInteractor } from '../base-interactor';
import Dexie from 'dexie';

// Media
export class Media extends BaseInteractor {
  endpoint = "/media";
  singular = "Media";
  plural = "Media";

  constructor(db: any, url: string = "/") {
    super(db, db.media)
    this.api = new MediaAPI({
      url: url,
      endpoint: this.endpoint,
      batchCount: this.batchCount
    });
  }

  async populate(): Promise<any> {
    let currentPage = 1;

    if (await this.compareState()) {
      console.debug("Leader and follower are in sync")
    } else {
      console.debug("beginning sync...")

      await this.api.all().then((request) => {
        this.db.content.put({type: this.endpoint, count: request.totalPages}).catch((e) => {});

        this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
          console.debug(`Added ${this.batchCount-e.failures.length} new Media`);
        });

        const iterations = Array.apply(null, { length: (request.totalPages - 1) });

        iterations.forEach(async () => {
          await this.api.some({limit: this.batchCount, page: currentPage++}).then((request) => {
            this.subject.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
              console.debug(`Added ${this.batchCount-e.failures.length} new Media`);
            });

            return true;
          });

          this.compareState()
        });
      });
    }
  }
}

// MediaAPI
class MediaAPI extends BaseAPI { }

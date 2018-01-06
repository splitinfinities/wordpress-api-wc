import { BaseAPI } from '../base-api';
import Dexie from 'dexie';

// Media
export class Media {
  private db;
  private api: MediaAPI;
  private endpoint = "/media";
  private batchCount = 100;

  constructor(db: any, url: string = "/") {
    this.db = db;
    this.api = new MediaAPI(url, this.endpoint, this.batchCount);
  }

  async compareState() {
    let follower = await this.db.media.count();
    let leader = await this.api.count();

    console.debug(this.endpoint, {"Follower": follower, "Leader": leader})

    return follower === leader;
  }

  async populate(): Promise<any> {
    let currentPage = 1;

    if (await this.compareState()) {
      console.debug("Leader and follower are in sync")
    } else {
      console.debug("beginning sync...")

      await this.api.all().then((request) => {
        // FIXME: This is totalPages because of how the API is returning false information.
        this.db.content.put({type: this.endpoint, count: request.totalPages}).catch((e) => {});

        this.db.media.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
          console.debug(`Added ${this.batchCount-e.failures.length} new Media`);
        });

        const iterations = Array.apply(null, { length: (request.totalPages - 1) });

        iterations.forEach(async () => {
          await this.api.some({limit: this.batchCount, page: currentPage++}).then((request) => {
            this.db.media.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
              console.debug(`Added ${this.batchCount-e.failures.length} new Media`);
            });

            return true;
          });

          this.compareState()
        });
      });
    }
  }

  async count(): Promise<any> {
    return await this.db.media.count();
  }

  async all(): Promise<any> {
    return this.db.media.toArray();
  }

  async some(args: someRequestArguments = {limit: 20, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: 20, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return this.db.media.offset(args.offset).limit(args.limit).toArray();
  }

  async getByID(id: number): Promise<any> {
    return this.db.media.where("id").equals(id).first();
  }

  async getBySlug(slug: string): Promise<any> {
    return this.db.media.where("slug").equals(slug).first();
  }
}

// MediaAPI
class MediaAPI extends BaseAPI {
  async all(): Promise<any> {
    return this.fetch(`?per_page=${this.batchCount}`);
  }

  async count(): Promise<any> {
    const result = await this.fetch('?per_page=1');
    return result.totalPages;
  }

  async some(args: someRequestArguments = {limit: this.batchCount, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: this.batchCount, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return this.fetch(`?per_page=${args.limit}&offset=${args.offset}`);
  }
}


declare interface someRequestArguments {
  limit?: number;
  offset?: number;
  page?: number;
}

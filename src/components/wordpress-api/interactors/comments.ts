import { BaseAPI } from '../base-api';
import Dexie from 'dexie';

// Comments
export class Comments {
  private db;
  private api: CommentsAPI;
  private endpoint = "/comments";
  private batchCount = 100;

  constructor(db: any, url: string = "/") {
    this.db = db;
    this.api = new CommentsAPI(url, this.endpoint, this.batchCount);
  }

  async compareState() {
    let follower = await this.db.comments.count();
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
        this.db.content.put({type: this.endpoint, count: request.total}).catch((e) => {});

        this.db.comments.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
          console.debug(`Added ${this.batchCount-e.failures.length} new Comments`);
        });

        const iterations = Array.apply(null, { length: (request.totalPages - 1) });

        iterations.forEach(async () => {
          await this.api.some({limit: this.batchCount, page: currentPage++}).then((request) => {
            this.db.comments.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
              console.debug(`Added ${this.batchCount-e.failures.length} new Comments`);
            });

            return true;
          });

          this.compareState()
        });
      });
    }
  }

  async count(): Promise<any> {
    return await this.db.comments.count();
  }

  async all(): Promise<any> {
    return this.db.comments.toArray();
  }

  async some(args: someRequestArguments = {limit: 20, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: 20, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return this.db.comments.limit(args.limit).offset(args.offset).toArray();
  }

  async getByID(id: number): Promise<any> {
    return this.db.comments.where("id").equals(id).first();
  }

  async getBySlug(slug: string): Promise<any> {
    return this.db.comments.where("slug").equals(slug).first();
  }
}

// CommentsAPI
class CommentsAPI extends BaseAPI {
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

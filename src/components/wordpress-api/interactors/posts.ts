import { BaseAPI, WordPressApiError } from '../base-api';
import Dexie from 'dexie';

// Posts
export class Posts {
  private db;
  private api: PostsAPI;
  private endpoint = "/posts";
  private batchCount = 100;

  constructor(db: any, url: string = "/") {
    this.db = db;
    this.api = new PostsAPI(url, this.endpoint, this.batchCount);
  }

  async compareState() {
    let follower = await this.db.posts.count();
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

        this.db.posts.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
          console.debug(`Added ${this.batchCount-e.failures.length} new Posts`);
        });

        const iterations = Array.apply(null, { length: (request.totalPages - 1) });

        iterations.forEach(async () => {
          await this.api.some({limit: this.batchCount, page: currentPage++}).then((request) => {
            this.db.posts.bulkPut(request.data).catch(Dexie.BulkError, (e) => {
              console.debug(`Added ${this.batchCount-e.failures.length} new Posts`);
            });

            return true;
          });

          this.compareState()
        });
      });
    }
  }

  async count(): Promise<any> {
    return await this.db.posts.count();
  }

  async all(): Promise<any> {
    return this.db.posts.toArray();
  }

  async some(args: someRequestArguments = {limit: 20, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: 20, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return this.db.posts.offset(args.offset).limit(args.limit).toArray();
  }

  async getByID(id: number): Promise<any> {
    console.debug('post in the db?')
    let post = await this.db.posts.where("id").equals(id).first();

    if (!post) {
      console.debug('post on the app then?')
      post = await this.api.fetch(`/${id}`);

      if (post.data.status !== 200) {
        return new WordPressApiError(post.data);
      }
    }

    return post;
  }

  async getBySlug(slug: string): Promise<any> {
    console.debug('post in the db?')
    let post = await this.db.posts.where("slug").equals(slug).first();

    if (!post) {
      console.debug('post on the app then?')
      post = await this.api.fetch(`?slug=${slug}`);

      console.log(post.data.status)

      if (post.data.status) {
        return new WordPressApiError(post.data);
      }

      post = post.data[0];
    }

    return post;
  }
}

// PostsAPI
class PostsAPI extends BaseAPI {
  async all(): Promise<any> {
    return this.fetch(`?per_page=${this.batchCount}`);
  }

  async count(): Promise<any> {
    const result = await this.fetch('?per_page=1');
    return result.total;
  }

  async some(args: someRequestArguments = {limit: 20, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: 20, offset: 0, page: undefined }, args)

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

import { Database } from './database';
import { Posts, Pages, Types, Comments, Media, Tags, Categories, Users } from './interactors';

//
// Declare Database
//
export class WordPress {
  private db = new Database();
  private url: string;
  private posts: Posts;
  private pages: Pages;
  private media: Media;

  constructor(url: string) {
    this.url = url;
    this.posts = new Posts(this.db, this.url);
    this.pages = new Pages(this.db, this.url);
    // types = new Types(this.db, this.url);
    // comments = new Comments(this.db, this.url);
    this.media = new Media(this.db, this.url);
    // tags = new Tags(this.db, this.url);
    // categories = new Categories(this.db, this.url);
    // users = new Users(this.db, this.url);
  }


  async prepareDatabase() {
    try {
      await this.posts.populate();
      await this.pages.populate();
      // await this.types.populate();
      // await this.comments.populate();
      await this.media.populate();
      // await this.tags.populate();
      // await this.categories.populate();
      // await this.users.populate();
    } catch (e) {
      return false;
    }

    return true;
  }
}

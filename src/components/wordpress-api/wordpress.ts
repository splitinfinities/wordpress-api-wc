import { Database } from './database';
import { Posts, Pages, Comments, Media, Tags, Categories, Users } from './interactors';

//
// Declare Database
//
export class WordPress {
  private db
  private url: string;
  private nonce: string;
  private posts: Posts;
  private pages: Pages;
  private media: Media;
  private comments: Comments;
  private tags: Tags;
  private categories: Categories;
  private users: Users;

  constructor(url: string, name: string, nonce?: string) {
    this.db = new Database(name);
    this.url = url;
    this.nonce = nonce;
    this.posts = new Posts(this.db, this.url, this.nonce);
    this.pages = new Pages(this.db, this.url, this.nonce);
    this.comments = new Comments(this.db, this.url, this.nonce);
    this.media = new Media(this.db, this.url, this.nonce);
    this.tags = new Tags(this.db, this.url, this.nonce);
    this.categories = new Categories(this.db, this.url, this.nonce);
    this.users = new Users(this.db, this.url, this.nonce);
  }

  async prepareDatabase() {
    return await Promise.all([
      this.posts.populate(),
      this.pages.populate(),
      this.comments.populate(),
      this.media.populate(),
      this.tags.populate(),
      this.categories.populate(),
      this.users.populate()
    ])
  }
}

import Dexie from 'dexie';

export interface WordpressApiPage {
  id?: number;
  title?: string;
  post_content?: string;
  post_excerpt?: string;
  featured_media?: number;
}
export interface WordpressApiPost {
  id?: number;
  title?: string;
  post_content?: string;
  post_excerpt?: string;
  featured_media?: number;
}

export interface WordpressApiMedia {
  id?: number;
  full_url?: string;
  sources?: Array<string>;
}

export interface WordpressApiAuthors {
  id?: number;
  full_url?: string;
  sources?: Array<string>;
}

export interface WordpressApiContent {
  type?: string;
  count?: number;
}

//
// Declare Database
//
export class Database extends Dexie {
  dbVersion: number = 1;

  posts: Dexie.Table<WordpressApiPost,number>;
  content: Dexie.Table<WordpressApiContent,string>;
  pages: Dexie.Table<WordpressApiPage,number>;
  comments: Dexie.Table<WordpressApiAuthors,number>;
  media: Dexie.Table<WordpressApiMedia,number>;
  tags: Dexie.Table<WordpressApiAuthors,number>;
  categories: Dexie.Table<WordpressApiAuthors,number>;
  users: Dexie.Table<WordpressApiAuthors,number>;

  constructor() {
    super("WordpressDatabase");

    this.version(this.dbVersion).stores({
      content: "type",
      posts: "id,slug",
      pages: "id,slug",
      comments: "id,slug,post",
      media: "id,slug",
      tags: "id,slug",
      categories: "id,slug",
      users: "id,slug"
    });
  }
}

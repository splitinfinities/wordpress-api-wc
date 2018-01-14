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
export declare class Database extends Dexie {
    dbVersion: number;
    posts: Dexie.Table<WordpressApiPost, number>;
    content: Dexie.Table<WordpressApiContent, string>;
    pages: Dexie.Table<WordpressApiPage, number>;
    comments: Dexie.Table<WordpressApiAuthors, number>;
    media: Dexie.Table<WordpressApiMedia, number>;
    tags: Dexie.Table<WordpressApiAuthors, number>;
    categories: Dexie.Table<WordpressApiAuthors, number>;
    users: Dexie.Table<WordpressApiAuthors, number>;
    constructor(name: string);
}

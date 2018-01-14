import Dexie from 'dexie';
//
// Declare Database
//
export class Database extends Dexie {
    constructor(name) {
        super(name);
        this.dbVersion = 1;
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

export declare class WordPress {
    private db;
    private url;
    private posts;
    private pages;
    private media;
    private comments;
    private tags;
    private categories;
    private users;
    constructor(url: string, name: string);
    prepareDatabase(): Promise<[any, any, any, any, any, any, any]>;
}

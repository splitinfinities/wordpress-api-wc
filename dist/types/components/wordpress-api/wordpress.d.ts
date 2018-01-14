export declare class WordPress {
    private db;
    private url;
    private nonce;
    private posts;
    private pages;
    private media;
    private comments;
    private tags;
    private categories;
    private users;
    constructor(url: string, name: string, nonce?: string);
    prepareDatabase(): Promise<[any, any, any, any, any, any, any]>;
}

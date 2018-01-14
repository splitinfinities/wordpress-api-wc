export declare class WordpressApi {
    baseUrl: string;
    name: string;
    nonce: string;
    api: any;
    wp: any;
    ready: boolean;
    cookie: boolean;
    componentWillLoad(): void;
    signedIn(): boolean;
    prepare(): Promise<any>;
    componentDidLoad(): void;
    render(): JSX.Element;
}

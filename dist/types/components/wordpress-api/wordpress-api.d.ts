export declare class WordpressApi {
    baseUrl: string;
    name: string;
    component: string;
    componentProps: {
        [key: string]: any;
    };
    nonce: string;
    api: any;
    wp: any;
    ready: boolean;
    cookie: boolean;
    componentWillLoad(): void;
    signedIn(): boolean;
    prepare(): Promise<any>;
    prepared(): Promise<boolean>;
    render(): JSX.Element;
}

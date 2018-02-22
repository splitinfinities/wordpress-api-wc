export declare class WordpressApi {
    element: HTMLElement;
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
    mountUp(): void;
    prepare(): Promise<any>;
    prepared(): boolean;
    render(): JSX.Element;
}

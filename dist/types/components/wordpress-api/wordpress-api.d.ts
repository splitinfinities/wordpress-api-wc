export declare class WordpressApi {
    baseUrl: string;
    name: string;
    nonce: string;
    wp: any;
    ready: boolean;
    componentWillLoad(): void;
    api(): any;
    prepare(): Promise<any>;
    componentDidLoad(): void;
    render(): JSX.Element;
}

import { BaseInteractor } from '../base-interactor';
export declare class Comments extends BaseInteractor {
    endpoint: string;
    singular: string;
    plural: string;
    constructor(db: any, url: string, nonce: string);
    getThreads(post: number, skipIndexedDB?: boolean): Promise<object[]>;
}

import { BaseInteractor } from '../base-interactor';
export declare class Pages extends BaseInteractor {
    endpoint: string;
    singular: string;
    plural: string;
    constructor(db: any, url: string, nonce: string);
}

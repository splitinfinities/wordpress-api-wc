import { BaseInteractor } from '../base-interactor';
export declare class Media extends BaseInteractor {
    endpoint: string;
    singular: string;
    plural: string;
    constructor(db: any, url: string, nonce: string);
    populate(): Promise<any>;
}

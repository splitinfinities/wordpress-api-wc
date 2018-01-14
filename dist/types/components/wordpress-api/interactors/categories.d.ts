import { BaseInteractor } from '../base-interactor';
export declare class Categories extends BaseInteractor {
    endpoint: string;
    singular: string;
    plural: string;
    constructor(db: any, url?: string);
}

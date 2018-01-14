var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class BaseAPI {
    constructor(params) {
        this.path = "/wp-json/wp/v2";
        this.batchCount = 100;
        /**
         * Helper method to turn an object into a query parameter string.
         * @param {object} payload [An object with the parameters to turn into a string]
         */
        this.objectToString = (payload) => Object.keys(payload).map(i => `${i}=${payload[i]}`).join('&');
        this.url = params.url;
        this.path = params.path || "/wp-json/wp/v2";
        this.endpoint = params.endpoint;
        this.batchCount = params.batchCount;
        this.nonce = params.nonce;
    }
    /**
     * Helper method for getting content from an endpoint
     * @param {object} payload [object storing the config you want to send to the endpoint.]
     */
    get_request(payload, path = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.objectToString(payload);
            let response = yield fetch(this.url + this.path + this.endpoint + path + (params ? "?" + params : ""));
            let data = yield response.json();
            const totalS = yield response.headers.get("x-wp-total");
            const totalPagesS = yield response.headers.get("x-wp-totalpages");
            const total = parseInt(totalS);
            const totalPages = parseInt(totalPagesS);
            return { data, total, totalPages };
        });
    }
    /**
     * Helper method for POSTing to an endpoint.
     * @param {object} payload [object storing the config you want to send to the endpoint.]
     */
    post_request(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.objectToString(payload);
            const config = {
                method: 'POST',
                body: params,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-WP-Nonce': this.nonce
                }
            };
            const response = yield fetch(this.url + this.path + this.endpoint, config);
            const data = yield response.json();
            return data;
        });
    }
    /**
     * [all description]
     * @return {Promise<any>} [description]
     */
    all() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.get_request({ 'per_page': this.batchCount });
        });
    }
    /**
     * [count description]
     * @return {Promise<any>} [description]
     */
    count() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.get_request({ 'per_page': 1 });
            return result.totalPages;
        });
    }
    /**
     * [some description]
     * @param  {undefined}}  args [description]
     * @return {Promise<any>}      [description]
     */
    some(args = { limit: this.batchCount, offset: 0, page: undefined }) {
        return __awaiter(this, void 0, void 0, function* () {
            args = Object.assign({ limit: this.batchCount, offset: 0, page: undefined }, args);
            if (args.page) {
                args.offset = args.limit * args.page;
            }
            return this.get_request({ 'per_page': args.limit, 'offset': args.offset });
        });
    }
    one(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get_request({}, `/${id}`);
            if (response.data.status !== 200) {
                throw new WordPressApiError(response);
            }
            return response;
        });
    }
    /**
     * [create description]
     * @param {[type]} payload [description]
     */
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post_request(payload);
            if (response.data && response.data.status !== 200) {
                throw new WordPressApiError(response);
            }
            return response;
        });
    }
}
export class WordPressApiError {
    constructor(error) {
        this.error = error;
    }
}

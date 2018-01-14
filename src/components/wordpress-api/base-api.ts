export class BaseAPI {
  private url;
  private path = "/wp-json/wp/v2";
  private endpoint;
  private nonce;

  batchCount = 100;

  /**
   * Helper method to turn an object into a query parameter string.
   * @param {object} payload [An object with the parameters to turn into a string]
   */
  private objectToString: Function = (payload: Object) => Object.keys(payload).map(i => `${i}=${payload[i]}`).join('&')

  constructor (params: BaseAPIParameters) {
    this.url = params.url
    this.path = params.path || "/wp-json/wp/v2"
    this.endpoint = params.endpoint
    this.batchCount = params.batchCount
    this.nonce = params.nonce
  }

  /**
   * Helper method for getting content from an endpoint
   * @param {object} payload [object storing the config you want to send to the endpoint.]
   */
  async get_request (payload: Object, path: string = "") {
    const params = this.objectToString(payload);

    let response = await fetch(this.url + this.path + this.endpoint + path + (params ? "?" + params : ""));
    let data = await response.json();
    const totalS: string = await response.headers.get("x-wp-total");
    const totalPagesS: string = await response.headers.get("x-wp-totalpages");
    const total: number = parseInt(totalS);
    const totalPages: number = parseInt(totalPagesS);

    return {data, total, totalPages};
  }

  /**
   * Helper method for POSTing to an endpoint.
   * @param {object} payload [object storing the config you want to send to the endpoint.]
   */
  async post_request (payload: object) {
    const params = this.objectToString(payload);

    const config: any = {
      method: 'POST',
      body: params,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-WP-Nonce': this.nonce
      }
    };

    const response = await fetch(this.url + this.path + this.endpoint, config);
    const data = await response.json();

    return data;
  }

  /**
   * [all description]
   * @return {Promise<any>} [description]
   */
  async all (): Promise<any> {
    return this.get_request({'per_page': this.batchCount});
  }

  /**
   * [count description]
   * @return {Promise<any>} [description]
   */
  async count (): Promise<any> {
    const result = await this.get_request({ 'per_page': 1 });
    return result.totalPages;
  }

  /**
   * [some description]
   * @param  {undefined}}  args [description]
   * @return {Promise<any>}      [description]
   */
  async some (args: someRequestArguments = {limit: this.batchCount, offset: 0, page: undefined}): Promise<any> {
    args = Object.assign({ limit: this.batchCount, offset: 0, page: undefined }, args)

    if (args.page) {
      args.offset = args.limit * args.page;
    }

    return this.get_request({'per_page': args.limit, 'offset': args.offset});
  }

  async one (id: number): Promise<any> {
    const response = await this.get_request({}, `/${id}`);

    if (response.data.status !== 200) {
      throw new WordPressApiError(response);
    }

    return response;
  }

  /**
   * [create description]
   * @param {[type]} payload [description]
   */
  async create (payload: object) {
    const response = await this.post_request(payload);

    if (response.data && response.data.status !== 200) {
      throw new WordPressApiError(response);
    }

    return response;
  }

}


export class WordPressApiError {
  error: object;

  constructor (error: object) {
    this.error = error;
  }
}


declare interface BaseAPIParameters {
  url: string
  path?: string
  endpoint: string
  batchCount: number
  nonce?: string
}


declare interface someRequestArguments {
  limit?: number;
  offset?: number;
  page?: number;
}

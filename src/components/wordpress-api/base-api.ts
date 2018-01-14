export class BaseAPI {
  url;
  path = "/wp-json/wp/v2";
  endpoint;
  batchCount;

  constructor(url: string, endpoint: string, batchCount: number = 100) {
    this.url = url
    this.endpoint = endpoint
    this.batchCount = batchCount
  }

  async fetch (params: string) {
    let response = await fetch(this.url + this.path + this.endpoint + params);
    let data = await response.json();
    const totalS: string = await response.headers.get("x-wp-total");
    const totalPagesS: string = await response.headers.get("x-wp-totalpages");
    const total: number = parseInt(totalS);
    const totalPages: number = parseInt(totalPagesS);

    return {data, total, totalPages};
  }
}


export class WordPressApiError {
  error: object;

  constructor (error: object) {
    this.error = error;
  }
}

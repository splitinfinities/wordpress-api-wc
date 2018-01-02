// Comments
export class Comments {
  private db;

  constructor (db) {
    this.db = db;
  }

  async getById(id: number): Promise<any> {
    return await this.db.media.where("id").equals(id).first();
  }
}

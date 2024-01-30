export class BaseCache<T> {
  constructor(mongo) {
    this.cache = new Map<string, T>();
    this.mongo = mongo;
  }
  private mongo: any;

  cache: Map<string, T>;

  inCache(id: string) {
    return this.cache.get(id);
  }

  async setInCache(id: string, val: T) {
    this.cache.set(id, val);
  }

  async removeInCache(id: string) {
    this.cache.delete(id);
  }

  async getInCacheOrBD(uuid: string) {
    if (uuid !== '') {
      if (!this.inCache(uuid)) {
        let doc = await this.mongo.findOne(uuid);
        if (doc) {
          this.setInCache(doc._id, doc);
        }
      }

      return this.inCache(uuid);
    }

    return undefined;
  }

  async CLEAR_CACHE() {
    this.cache.clear();
  }
}

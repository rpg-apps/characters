export const useMemoryCache = (load, keyEncoding) => new MemoryCache(load, keyEncoding)

export class MemoryCache {
  constructor (load, keyEncoding=x=>x) {
    Object.assign(this, { load, keyEncoding, store: {} })
  }

  get (key) {
    const encodedKey = this.keyEncoding(key)
    if (!this.store[encodedKey]) {
      this.store[encodedKey] = Promise.resolve().then(() => this.load(key))
      return this.store[encodedKey]
    }
    return this.store[encodedKey]
  }
}

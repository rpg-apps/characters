export default class TypeParser {
  constructor(types) {
    this.types = [].concat(DEFAULT_TYPES).concat(types)
  }

  parseNewType (rawType) {
  	const type = undefined
    this.types.push(type)
  }

  parseExistingType (rawType) {
    const type = undefined
    return type
  }
}

const DEFAULT_TYPES = []
export default class TypeParser {
  constructor(types) {
    this.types = [].concat(PRESET_TYPES).concat(types)
  }

  // When defining a type in a 'types' field.
  parseDefinition (rawType) {
  	const type = undefined
    this.types.push(type)
    return type
  }

  // When using a type to parse a value
  parseValue (value, type) {
    const type = undefined
    return type
  }
}

const PRESET_TYPES = []
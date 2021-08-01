import { getFlag } from '../parsing-utils'
import Type from '../../models/rules/mechanism/type'

export default class TypeParser {
  constructor(context) {
    this.context = context
    this.types = [].concat(Type.PRESETS)
  }

  parseDefinition (name, definition) {
    const fieldTypes = Object.entries(definition).reduce((types, [field, typeDef]) => ({ ...types, [field]: this.parseUsage(typeDef) }), { })
    const type = new Type.ComplexType(name, fieldTypes)
    this.types.push(type)
    return type
  }

  parseUsage (name) {
    const [array, childTypeName] = getFlag(name, ARRAY_SUFFIX, true)
    if (array) {
      const childType = this.parseUsage(childTypeName)
      return new Type.Array(childType)
    }

    return this.types.find(type => type.name === name)
  }
}

const ARRAY_SUFFIX = 'array'

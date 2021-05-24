import { ParsingError, getFlag } from '../parsing-utils'

export default class TypeParser {
  constructor(context) {
    this.context = context
    this.types = [].concat(Object.entries(PRESET_TYPES).map(([name, parseValue]) => ({ name, parseValue })))
  }

  parseDefinition (name, definition) {
    const type = {
      name, definition,
      parseValue: (value) => Object.assign(this.parseValue(value, definition), { type: name })
    }
    this.types.push(type)
    return type
  }

  // When using a type to parse a value
  parseValue (raw, type, params = { }) {
    if (type.constructor === String) {
      const [array, childType] = getFlag(type, ARRAY_SUFFIX, true)
      if (array) {
        if (!Array.isArray(raw)) throw new ParsingError('Array field is not an array')
        return raw.map(arrayItem => this.parseValue(arrayItem, type, params))
      } else {
        const typeHandler = this.types.find(t => t.name === type)
        if (!typeHandler) throw new ParsingError(`Unkonw type ${type}`)
        return typeHandler.parseValue(raw, this.context, params)
      }
    } else {
      return Object.entries(type)
      .reduce((value, [fieldName, fieldType]) =>
        Object.assign(value, { [fieldName]: this.parseValue(raw[fieldName], fieldType, params) })
      , { })
    }
  }
}

const PRESET_TYPES = {
  boolean: value => {
    if (typeof value === Boolean)              return value
    else if (['yes', 'true'].includes(value))  return true
    else if (['no', 'false'].includes(value))  return false
    throw new ParsingError('No such boolean value')
  },
  'long text': value => String(value),
  string: value => String(value),
  number: value => {
    try {
      return Number(value)
    } catch (error) {
      throw new ParsingError(error.message)
    }
  },
  formula: (value, { formulaParser }, params) => formulaParser.parseUsage(value, params),
  move: (value, { parseMove }) => parseMove(value)
}

const ARRAY_SUFFIX = ' array'

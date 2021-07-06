export default class Type {
  constructor (name) {
    this.name = name
  }

  parseValue () {
    throw new Error('parseValue should not be called on Type class directly')
  }
}

Type.PresetType = class PresetType extends Type {
  constructor (name, parseValue) {
    super(name)
    this.parseValue = parseValue
  }
}

Type.Array = class ArrayOfType extends Type {
  constructor (childType) {
    super(`${childType.name} array`)
    this.childType = childType
  }

  parseValue (raw) {
    return raw.map(item => childType.parse(item))
  }
}

Type.ComplexType = class ComplexType extends Type {
  constructpr (name, fieldTypes) {
    super(name)
    this.fieldTypes = fieldTypes
  }

  // Recursivly parse values using the types definied in the constructor
  parseValue (raw) {
    return Object.keys(this.fieldTypes).reduce(([field, type], parsed) => { ...parsed, [field]: type.parseValue(raw[field]) }, { })
  }
}

Type.PRESETS = [
  new PresetType('boolean', raw => {
      if (typeof value === Boolean)              return value
      else if (['yes', 'true'].includes(value))  return true
      else if (['no', 'false'].includes(value))  return false
      return Boolean(value)
    }),
  new PresetType('long text', value => String(value)),
  new PresetType('string', value => String(value)),
  new PresetType('number', value => Number(value)),
  new PresetType('formula', (value, { formulaParser }, params) => formulaParser.parseUsage(value, params)),
  new PresetType('move', (value, { parseMove }) => parseMove('', value, context))
]
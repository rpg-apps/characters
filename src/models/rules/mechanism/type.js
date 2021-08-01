import Move from '../move'

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

  parseValue (raw=[]) { // TODO remove the default value after finishing the playbooks in the core.yml
    return raw.map(item => this.childType.parseValue(item))
  }
}

Type.ComplexType = class ComplexType extends Type {
  constructor (name, fieldTypes) {
    super(name)
    this.fieldTypes = fieldTypes
  }

  // Recursively parse values using the types definied in the constructor
  parseValue (raw) {
    return Object.entries(this.fieldTypes).reduce((parsed, [field, type]) => ({ ...parsed, [field]: type.parseValue(raw[field]) }), { })
  }
}

Type.PRESETS = [
  new Type.PresetType('boolean', value => {
      if (typeof value === Boolean)              return value
      else if (['yes', 'true'].includes(value))  return true
      else if (['no', 'false'].includes(value))  return false
      return Boolean(value)
    }),
  new Type.PresetType('long text', value => String(value)),
  new Type.PresetType('string', value => String(value)),
  new Type.PresetType('number', value => Number(value)),
  new Type.PresetType('range', value => {
    const [start, end] = value.split('..').map(i => Number(i))
    return { start, end }
  }),
  new Type.PresetType('formula', value => value), // TODO fix this
  new Type.PresetType('effect', value => value), // TODO fix this
  new Type.PresetType('move', value => new Move(value))
]

import { camelCase } from 'change-case'

import Move from '../models/move'
import Mechanism from '../models/mechanism'

import TypeParser from './type-parser'

import { parseWithKeywords, parseFields } from './parsing-utils'

export default parseMechanism (name, rawMechanism, existingMechanisms) {
  const typeParser = new TypeParser(existingMechanisms.map(mechanism => mechanism.types))
  const fields = parseFields(rawMechanism, PARSERS, { typeParser })
  fields.name = name
  return new Mechanism(fields)
}

const PARSERS = {
  types: (types, { typeParser }) => typeParser.parseNewType(type),
  globalFields: fields => Object.entries(fields).reduce((pasredFields, [field, value]) => {
    if (value === 'large') {
      // TODO LARGE
    }
    // TODO parse value by type
    return Object.assign(parseFields, { [camelCase(field)]: value })
  }),
  playbookFields: (fields, { typeParser }) => Object.entries(fields).reduce((pasredFields, [field, value]) => {
    const optional = field.startWith(OPTIONAL_PREFIX)
    if (optional) {
      field.replace(OPTIONAL_PREFIX, '')
    }
    const type = typeParser.parseExistingType(value)
    return Object.assign(parseFields, { [camelCase(field)]: { type, optional } })
  }),
  characterFields: fields => {

  },
  formulas: formulas => {},
  effects: effects => {},
  choices: choices => {}
}

const OPTIONAL_PREFIX = 'optional '

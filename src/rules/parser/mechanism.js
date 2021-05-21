import Mechanism from '../models/mechanism'

import { parseFields } from './parsing-utils'

export default parseMechanism (name, rawMechanism, context) {
  const fields = parseFields(rawMechanism, PARSERS, context)
  fields.name = name
  return new Mechanism(fields)
}

const PARSERS = {
  types: (types, { typeParser }) => Object.entries(types).map(([name, type]) => typeParser.parseDefinition(name, type)),
  formulas: (formulas, { formulaParser }) => Object.entries(formulas).map(([formula, meaning]) => formulaParser.parseDefinition(formula, meaning)),
  globalFields: (fields, { fieldParser }) => Object.entries(fields).map(([field, value]) => fieldParser.parseDefinition(field, value, 'global')),
  playbookFields: (fields, { fieldParser }) => Object.entries(fields).map(([field, value]) => fieldParser.parseDefinition(field, value, 'playbook')),
  choices: (choices, { choiceParser }) => Object.entries(choices).map(([name, choice]) => choiceParser.parse(name, choice)),
  characterFields: (fields, { fieldParser }) => Object.entries(fields).map(([field, value]) => fieldParser.parseDefinition(field, value, 'character')),
  effects: (effects, { effectParser }) => Object.entries(effects).map(([effect, meaning]) => effectParser.parseDefinition(effect, meaning))
}

import Mechanism from '../models/rules/mechanism'

import { parseFields } from './parsing-utils'

export default function parseMechanism (name, rawMechanism, context) {
  return new Mechanism({ ...parseFields(rawMechanism, PARSERS, context), name })
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

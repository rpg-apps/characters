import Playebook from '../models/rules/playbook'

import { parseFields } from './parsing-utils'

export default function parsePlaybook (name, rawPlaybook, context) {
  return new Playebook({ ...parseFields(rawPlaybook, getParsers(context, name), context), name })
}

const getParsers = ({ fieldParser }, playbookName) => {
  // TODO add specific mechanism parsing
  return fieldParser.fields.playbook.reduce((parsers, fieldDefinition) => {
    const parser = (rawField, { fieldParser }) => fieldParser.parseFieldValue(fieldDefinition.name, rawField, playbookName)
    return Object.assign(parsers, { [fieldDefinition.name]: parser })
  }, { })
}

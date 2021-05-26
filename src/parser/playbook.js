import Playebook from '../models/rules/playbook'

import { parseFields } from './parsing-utils'

export default function parsePlaybook (name, rawPlaybook, context) {
  const parsers = getParsers(context, name)
  const fields = parseFields(rawPlaybook, parsers, context)
  fields.name = name
  return new Playebook(fields)
}

const getParsers = ({ fieldParser }, playbookName) => {
  return fieldParser.fields.playbook.reduce((parsers, fieldDefinition) => {
    const parser = (rawField, { fieldParser }) => fieldParser.parseFieldValue(fieldDefinition.name, rawField, playbookName)
    return Object.assign(parsers, { [fieldDefinition.name]: parser })
  }, { })
}

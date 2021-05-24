import Playebook from '../models/rules/playbook'

import { parseFields } from './parsing-utils'

export default function parsePlaybook (name, rawPlaybook, context) {
  const parsers = getParsers(context)
  const fields = parseFields(rawPlaybook, parsers, context)
  fields.name = name
  fields.context = context.extract()
  return new Playebook(fields)
}

const getParsers = ({ fieldParser }) => {
  return fieldParser.fields.playbook.reduce((parsers, fieldDefinition) => {
    const parser = (rawField, { fieldParser }) => fieldParser.parseFieldValue(fieldDefinition.name, rawField)
    return Object.assign(parsers, { [fieldDefinition.name]: parser })
  }, { })
}

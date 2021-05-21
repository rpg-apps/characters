import Playebook from '../models/playbook'

import { parseFields } from './parsing-utils'

export default parsePlaybook (name, rawPlaybook, context) {
  const parsers = getParsers(context)
  const fields = parseFields(rawPlaybook, parsers, context)
  fields.name = name
  return new Playebook(fields)
}

const getParsers = ({ fieldsParser }) => {
  return fieldsParser.fields.playbook.reduce((parsers, fieldDefinition) => {
    const parser = (rawField, context) => context.typesParser.parseValue(fieldDefinition.type, rawField, context)
    return Object.assign(parsers, { [fieldDefinition.name]: parser })
  }, { })
}

import Playebook from '../models/rules/playbook'

import { parseFields } from './parsing-utils'

export default function parsePlaybook (name, rawPlaybook, context) {
  // TODO what about formula initialized values?
  const fields = context.fieldParser.fields.playbook.reduce((fields, fieldDefinition) => ({ ...fields, [fieldDefinition.name]: rawPlaybook[fieldDefinition.name] }), { })
  return { name, ...fields }
}

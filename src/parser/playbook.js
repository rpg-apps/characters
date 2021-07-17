import Playbook from '../models/rules/playbook'

export default function parsePlaybook (name, rawPlaybook, context) {
  // TODO what about formula initialized values?
  const fields = context.fieldParser.fields.playbook.reduce((fields, fieldDefinition) => ({ ...fields, [fieldDefinition.name]: rawPlaybook[fieldDefinition.name] }), { })
  return new Playbook({ name, ...fields })
}

import Playbook from '../models/rules/playbook'

export default function parsePlaybook (name, rawPlaybook, rulebook, mechanismParser) {
  const mechanisms = []
    .concat(rulebook.mechanisms)
    .concat(Object.entries(rawPlaybook.mechanisms || {})
      .map(([rawMechanismName, rawMechanism]) => mechanismParser.parse(rawMechanism)))
    .filter((mechanism, index, array) => array.every((otherMechanism, otherIndex) => otherMechanism.name !== mechanism.name || otherIndex >= index))

  const rules = mechanisms.reduce((rules, mechanism) => {
    Object.entries(mechanism).filter(([key]) => !['name'].includes(key)).forEach(([key, value]) => {
      rules[key] = (rules[key] || []).concat(value)
    })
    return rules
  }, { })

  const fields = rules.playbookFields.reduce((fields, fieldDefinition) => {
    const value = rawPlaybook[fieldDefinition.name]
    if (!fieldDefinition.optional && !value) {
      // Resume throwing an error after all playbooks are ready
      // throw new Error(`Missing field ${fieldDefinition.name} in playbook ${this.name}`)
    }

    return { ...fields, [fieldDefinition.name]: fieldDefinition.type.parseValue(value) }
  }, rules.globalFields.reduce((fields, field) => ({ ...fields, [field.name]: field.value }), { }))

  return new Playbook({ name, fields, characterFields: rules.characterFields, choices: rules.choices, rules })
}

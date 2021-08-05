import Playbook from '../models/rules/playbook'

export default function parsePlaybook (name, rawPlaybook, rulebook, mechanismParser) {
  const mechanisms = []
    .concat(rulebook.mechanisms)
    .concat(Object.entries(rawPlaybook.mechanisms || {})
      .map(([rawMechanismName, rawMechanism]) => mechanismParser.parse(rawMechanismName, rawMechanism)))
    .filter((mechanism, index, array) => array.every((otherMechanism, otherIndex) => otherMechanism.name !== mechanism.name || otherIndex >= index))

  const rules = mechanisms.reduce((rules, mechanism) => {
    Object.entries(mechanism).filter(([key]) => !['name'].includes(key)).forEach(([key, value]) => {
      rules[key] ||= []
      const itemsToAdd = JOIN_FILTERS.hasOwnProperty(key) ? value.filter(item => rules[key].every(existingItem => JOIN_FILTERS[key](item) !== JOIN_FILTERS[key](existingItem))) : value
      rules[key] = rules[key].concat(itemsToAdd)
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

const JOIN_FILTERS = {
  types: type => type.name,
  effects: effect => effect.pattern.raw,
  formulas: formula => formula.pattern.raw,
}

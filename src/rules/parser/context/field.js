export default class FieldParser {
  constructor(context) {
    this.context = context
    this.fields = { global: [], playbook: [], character: [] }
  }

  existingFields () {
    return [].concat(this.fields.global).concat(this.fields.playbook).concat(this.fields.character)
  }

  // When defining a global, playbook or character field.
  // The initialization process for each is different:
  // global fields get a value immediately, playbook fields get a value while parsing the playbook
  // and character fields get the values on character creation.
  parseDefinition (name, value, scope) {
  	const field = { name, scope }
    switch (scope) {
      case 'global':
        if (value === 'large') {
          field.value = this.context.rawRules[name]
        } else {
          field.value = value
        }
        break
      case 'playbook':
        field.type = value
        break
      case 'character':
        field.formula = formulaParser.parseUsage(value)
    }
    this.fields[scope].push(field)
    return field
  }
}

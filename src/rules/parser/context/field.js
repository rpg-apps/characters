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
  parseDefinition (rawField, type) {
  	const field = undefined
    this.fields[type].push(field)
    return field
  }
}

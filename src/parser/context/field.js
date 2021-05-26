import { getFlag, ParsingError } from '../parsing-utils'

export default class FieldParser {
  constructor(context) {
    this.context = context
    this.fields = { global: [], playbook: [], character: [] }
  }

  allFields () {
    return [].concat(this.fields.global).concat(this.fields.playbook).concat(this.fields.character)
  }

  // When defining a global, playbook or character field.
  // The initialization process for each is different:
  // global fields get a value immediately, playbook fields get a value while parsing the playbook
  // and character fields get the values on character creation.
  parseDefinition (name, value, scope, playbook='all') {
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
        const [optional, nameAfterOptional] = getFlag(name, OPTIONAL_PREFIX)
        field.optional = optional
        field.name = nameAfterOptional
        field.type = value
        break
      case 'character':
        Object.assign(field, this.fieldValueGetter(name, value, null, playbook))
        break
      default:
        throw new ParsingError('Illegal field scope')
    }
    this.fields[scope].push(field)
    return field
  }

  parseFieldValue (name, value, playbook = 'all') {
    const fieldDefinition = this.allFields().find(field => field.name === name)
    if (!fieldDefinition) {
      throw new ParsingError(`Unknown field: ${name}`)
    }

    playbook = fieldDefinition.scope === 'playbook' ? playbook : 'all'
    return { ...fieldDefinition, ...this.fieldValueGetter(name, value, fieldDefinition.type, playbook), playbook }
  }

  fieldValueGetter (name, value, type, playbook) {
    const [useChoice, valueChoice] = getFlag(value, CHOICE_PREFIX)
    if (useChoice) {
      const choice = this.context.choiceParser.parse(null, valueChoice, playbook)
      if (!choice.name) {
        choice.name = name
      }
      return { choice }
    } else {
      return { formula: this.context.formulaParser.parseUsage(value, { type }) }
    }
  }
}

const OPTIONAL_PREFIX = 'optional'
const CHOICE_PREFIX = 'choose'
import { capitalCase } from 'change-case'

import { getFlag, ParsingError } from '../parsing-utils'

import Field from '../../models/rules/context/field'

export default class FieldParser {
  constructor(context) {
    this.context = context
    this.fields = Object.values(Field.SCOPE).reduce((scope, allScopes) => { ...allScopes, [scope]: [] }, { })
  }

  allFields () {
    return Object.values(this.fields).reduce((scopeFields, allFields) => allFields.concat(scopeFields), [])
  }

  parseDefinition (name, value, scope, playbook='all') {
    const fieldDefinitionParser = this[`parse${capitalCase(scope)}FieldDefinition`]
    if (!fieldDefinitionParser) {
      throw new ParsingError('Illegal field scope')
    }
    const field = fieldDefinitionParser(name, value, playbook)
    this.fields[scope].push(field)
    return field
  }

  parseGlobalFieldDefinition (name, value) {
    if (value === 'large') {
      value = this.context.rawRules[name]
    }
    return new Field.GlobalField(name, value)
  }

  parsePlaybookFieldDefinition (name, value) {
    const [optional, nameAfterOptional] = getFlag(name, OPTIONAL_PREFIX)
    return new Field.PlaybookField(nameAfterOptional, value, optional)
  }

  parseCharacterFieldDefinition (name, value, playbook) {
    const [useChoice, valueChoice] = getFlag(value, CHOICE_PREFIX)

    if (useChoice) {
      const choice = this.context.choiceParser.parseDefintion(null, valueChoice, playbook)
      choice.name = choice.name || name
      return new Field.ChoiceField(name, playbook, choice)
    }

    const formulaCall = this.context.formulaParser.parseUsage(value)
    return new Field.FormulaField(name, playbook, formulaCall)
  }

  parseFieldUsage (name) {
    return this.allFields().find(field => field.name === name)
  }
}

const OPTIONAL_PREFIX = 'optional'
const CHOICE_PREFIX = 'choose'
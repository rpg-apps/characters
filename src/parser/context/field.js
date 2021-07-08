import { capitalCase } from 'change-case'

import { getFlag } from '../parsing-utils'

import Field from '../../models/rules/mechanism/field'

export default class FieldParser {
  constructor(context) {
    this.context = context
    this.fields = Object.values(Field.SCOPE).reduce((allScopes, scope) => ({ ...allScopes, [scope]: [] }), { })
  }

  allFields () {
    return Object.values(this.fields).reduce((scopeFields, allFields) => allFields.concat(scopeFields), [])
  }

  parseGlobalFieldDefinition (name, value) {
    if (value === 'large') {
      value = this.context.rawRules[name]
    }
    
    const field = new Field.GlobalField(name, value)
    this.fields.global.push(field)
    return field
  }

  parsePlaybookFieldDefinition (name, value) {
    const [optional, nameAfterOptional] = getFlag(name, OPTIONAL_PREFIX)

    const field = new Field.PlaybookField(nameAfterOptional, value, optional)
    this.fields.playbook.push(field)
    return field
  }

  parseCharacterFieldDefinition (name, value, playbook) {
    const [useChoice, valueChoice] = getFlag(value, CHOICE_PREFIX)
    let field

    if (useChoice) {
      const choice = this.context.choiceParser.parseDefinition(null, valueChoice, playbook)
      choice.name = choice.name || name

      field = new Field.ChoiceField(name, playbook, choice)
    } else {
      const [auto, valueAuto] = getFlag(value, AUTO_PREFIX)
      const formulaCall = this.context.formulaParser.parseUsage(valueAuto)

      field = auto ? new Field.FormulaField(name, playbook, formulaCall) : new Field.ValueField(name, playbook, formulaCall)
    }


    this.fields.character.push(field)
    return field
  }

  parseFieldUsage (name) {
    return this.allFields().find(field => field.name === name)
  }
}

const OPTIONAL_PREFIX = 'optional'
const CHOICE_PREFIX = 'choose'
const AUTO_PREFIX = 'auto'
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

    const field = new Field.PlaybookField(nameAfterOptional, this.context.typeParser.parseUsage(value), optional)
    this.fields.playbook.push(field)
    return field
  }

  parseCharacterFieldDefinition (name, value, playbook) {
    const [useChoice, valueChoice] = getFlag(value, CHOICE_PREFIX)
    let field

    if (useChoice) {
      const choice = this.context.choiceParser.parseDefinition(name, valueChoice, playbook)
      choice.name = choice.name || name

      field = new Field.ChoiceField(name, playbook, choice)
    } else {
      const [auto, formula] = getFlag(value, AUTO_PREFIX)

      field = auto ? new Field.FormulaField(name, playbook, formula) : new Field.ValueField(name, playbook, formula)
    }

    this.fields.character.push(field)
    return field
  }
}

const OPTIONAL_PREFIX = 'optional'
const CHOICE_PREFIX = 'choose'
const AUTO_PREFIX = 'auto'

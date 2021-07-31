import { getFlag } from '../parsing-utils'

import Choice from '../../models/rules/mechanism/choice'

export default class ChoiceParser {
  constructor(context) {
    this.context = context
    this.choices = []
  }

  parseDefinition (name, definition, playbook = 'all', effect = undefined) {
    if (definition.constructor !== String) {
      const effect = definition['on choice'] ? this.context.effectParser.parseUsage(definition['on choice']) : undefined
      return this.parseDefinition(name, definition.choose, playbook, effect)
    }

    const existingChoice = this.choices.find(c => definition.startsWith(c.name))
    if (existingChoice) {
      const [useField, fieldDefinition] = getFlag(definition.replace(`${existingChoice.name} `, ''), FIELD_USAGE_PREFIX)
      const field = useField ? fieldDefinition : 'root'
      return new Choice.ProxyChoice(existingChoice, field)
    }

    const [free, definitionAfterFreeCheck] = getFlag(definition, FREE_CHOICE_PREFIX)
    const type = this.getChoiceType(definitionAfterFreeCheck)

    const choice = new Choice.BasicChoice(name, type, playbook, free)
    this.choices.push(choice)
    return choice
  }

  getChoiceType (definition) {
    const [unique, definitionAfterUniqueCheck] = getFlag(definition, UNIQUE_CHOICE_PREFIX)
    const [from, definitionAfterChooseFromCheck] = getFlag(definitionAfterUniqueCheck, CHOOSE_FROM_PREFIX)
    if (from) {
      const from = this.context.fieldParser.allFields().find(field => field.name === definitionAfterChooseFromCheck)
      if (!from) throw new Error(`Field not found: ${definitionAfterChooseFromCheck}`)
      return { from, unique }
    }

    return this.context.typeParser.parseUsage(definitionAfterChooseFromCheck)
  }
}

const FREE_CHOICE_PREFIX = 'freely'
const UNIQUE_CHOICE_PREFIX = 'unique'
const CHOOSE_FROM_PREFIX = 'from'
const FIELD_USAGE_PREFIX = 'and use'

import { getFlag } from '../parsing-utils'
import Choice from '../../models/rules/mechanism/choice'

export default class ChoiceParser {
  constructor(context) {
    this.context = context
    this.choices = []
  }

  parseDefinition (name, definition, playbook = 'all', effect = undefined) {
    return this._parseChoiceFromObject(name, definition, playbook, effect) ||
      this._parseProxyChoice(name, definition, playbook, effect) ||
      this._parseBasicChoice(name, definition, playbook, effect)
  }

  _parseChoiceFromObject (name, definition, playbook, effect) {
    if (definition.constructor !== String) {
      const effect = definition['on choice']
      return this.parseDefinition(name, definition.choose, playbook, effect)
    }

    return false
  }

  _parseProxyChoice (name, definition, playbook, effect) {
    const existingChoice = this.choices.find(c => definition.startsWith(c.name))
    if (existingChoice) {
      const [useField, fieldDefinition] = getFlag(definition.replace(`${existingChoice.name} `, ''), FIELD_USAGE_PREFIX)
      const field = useField ? fieldDefinition : 'root'
      return new Choice.ProxyChoice(existingChoice, field)
    }

    return false
  }

  _parseBasicChoice (name, definition, playbook, effect) {
    const [free, definitionAfterFreeCheck] = getFlag(definition, FREE_CHOICE_PREFIX)
    const type = this._getBasicChoiceType(definitionAfterFreeCheck)

    const choice = new Choice.BasicChoice(name, type, playbook, free)
    this.choices.push(choice)
    return choice
  }

  _getBasicChoiceType (definition) {
    const [unique, definitionAfterUniqueCheck] = getFlag(definition, UNIQUE_CHOICE_PREFIX)
    const [from, definitionAfterChooseFromCheck] = getFlag(definitionAfterUniqueCheck, CHOOSE_FROM_PREFIX)
    if (from) {
      const from = definitionAfterChooseFromCheck
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

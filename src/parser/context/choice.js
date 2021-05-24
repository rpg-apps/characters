import { ParsingError, getFlag } from '../parsing-utils'

/* Parses character creation choices.
   A choice has the following fields:
   - name
   - playbook: on which playbook is it used? default is all
   - effect: an effect that ocours when the choice is made.
   - type: can eith be { from: <field> } where field is a playbook or global field to choose from, or an existing type.
           fields that can be used in a 'from' statement are either arrays or 2d arrays (in which each array will become a choice)
   - free: if the choice is not forced to be in the given type/from the given field.
   - unique: if a 'from' choice is used multiple times, it requires each item of the field to be used only one.
 */
export default class ChoiceParser {
  constructor(context) {
    this.context = context
    this.choices = []
  }

  // When defining a choice in the 'choices' field or from 'choose' keyword.
  parse (name, definition, playbook = 'all') {
    if (definition.constructor !== String) {
      const choice = this.parse(name, definition.choose, playbook)
      if (definition['on choice']) {
        choice.effect = this.context.effectParser.parseUsage(definition['on choice'])
      }
      return choice
    }

    const existingChoice = this.choices.find(c => definition.startsWith(c.name))
    if (existingChoice) {
      const [useField, fieldDefinition] = getFlag(definition.replace(`${existingChoice.name} `, ''), FIELD_USAGE_PREFIX)
      const field = useField ? fieldDefinition : 'root'
      return { proxy: existingChoice, field }
    }

    const choice = { name, playbook }

    const [free, definitionAfterFreeCheck] = getFlag(definition, FREE_CHOICE_PREFIX)
    choice.free = free

    const [unique, definitionAfterUniqueCheck] = getFlag(definitionAfterFreeCheck, UNIQUE_CHOICE_PREFIX)
    choice.unique = unique

    const [from, definitionAfterChooseFromCheck] = getFlag(definitionAfterUniqueCheck, CHOOSE_FROM_PREFIX)
    if (from) {
      const fieldMatch = this.context.fieldParser.allFields().find(field => field.name === definitionAfterChooseFromCheck)
      if (!fieldMatch) throw new ParsingError(`Field not found: ${definitionAfterChooseFromCheck}`)
      choice.type = { from: fieldMatch }
    } else {
      choice.type = definitionAfterChooseFromCheck
    }
    
    this.choices.push(choice)
    return choice
  }
}

const FREE_CHOICE_PREFIX = 'freely'
const UNIQUE_CHOICE_PREFIX = 'unique'
const CHOOSE_FROM_PREFIX = 'from'
const FIELD_USAGE_PREFIX = 'and use'
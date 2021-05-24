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
    const existingChoice = this.choices.find(c => definition.startsWith(c.name))
    if (existingChoice) {
      definition = definition.replace(`${existingChoice.name} `, '')
      const [useField, definition] = getFlag(definition, FIELD_USAGE_PREFIX)
      const field = useField ? definition : 'root'
      return { proxy: existingChoice, field }
    }

    const choice = { name, playbook }
    
    if (definition['on choice']) {
      choice.effect = effectParser.parseUsage(definition['on choice'])
    }

    definition = definition.choose || definition
    const [free, definition] = getFlag(definition, FREE_CHOICE_PREFIX)
    choice.free = free

    const [unique, definition] = getFlag(definition, UNIQUE_CHOICE_PREFIX)
    choice.unique = unique

    const [from, definition] = getFlag(definition, CHOOSE_FROM_PREFIX)
    if (from) {
      const fieldMatch = this.context.fieldsParser.existingFields().find(field => field.name === definition)
      if (!fieldMatch) throw new ParsingError(`Field not found: ${definition}`)
      choice.type = { from: fieldMatch }
    } else {
      choice.type = definition
    }
    
    this.choices.push(choice)
    return choice
  }
}

const FREE_CHOICE_PREFIX = 'freely '
const UNIQUE_CHOICE_PREFIX = 'unique '
const CHOOSE_FROM_PREFIX = 'from '
const FIELD_USAGE_PREFIX = 'and use '
import { Flag, Sentence, mapSmolJSON } from '../parsing-utils'
import MechanismFieldParser from './mechanism_field_parser'
import Choice from '../../models/rules/mechanism/choice'

export default class ChoiceParser extends MechanismFieldParser {

  parseDefinition (name, definition, playbook = 'all') {
    const choice = new Choice(name, this._generateChoiceType(definition), playbook)
    return this.save(choice)
  }

  parseUsage (name, definition, playbook = 'all') {
    const [effect, definitionWithoutEffect] = EFFECT_FLAG.extract(definition)
    const [field, definitionWithoutField] = FIELD_USAGE_FLAG.extract(definitionWithoutEffect)

    const choice = this._getExistingChoice(definitionWithoutField) || this.parseDefinition(name, definition, playbook)

    return new Choice.Usage(choice, field || 'root', effect)
  }

  _getExistingChoice (definition) {
    const firstWord = Sentence.firstWord(definition)
    return this.data.find(choice => choice.name === firstWord) || false
  }

  _generateChoiceType (definition) {
    const [assignment, definitionWithoutAssignment] = ASSIGNMENT_CHOICE_FLAG.extract(definition)
    const [free, definitionAfterFreeCheck] = FREE_CHOICE_FLAG.extract(definitionWithoutAssignment)
    return CHOOSE_FROM_FLAG.execute(definitionAfterFreeCheck, {
      onTrue: from => ({ from, free, assignment: assignment ? mapSmolJSON(assignment, () => undefined) : undefined }),
      onFalse: () => this.context.typeParser.parseUsage(definitionAfterFreeCheck)
    })
  }
}

const ASSIGNMENT_CHOICE_FLAG = new Flag.Prefix('and assign')
const FREE_CHOICE_FLAG = new Flag.Prefix('freely')
const CHOOSE_FROM_FLAG = new Flag.Prefix('from')
const FIELD_USAGE_FLAG = new Flag.Parameter('and take')
const EFFECT_FLAG = new Flag.Parameter('and after')

import { Flag } from '../parsing-utils'
import MechanismFieldParser from './mechanism_field_parser'

import Field from '../../models/rules/mechanism/field'

export class GlobalFieldParser extends MechanismFieldParser {
  parseDefinition (name, value) {
    if (value === 'large') {
      value = this.context.rawRules[name]
    }

    const field = new Field.GlobalField(name, value)
    return this.save(field)
  }
}

export class PlaybookFieldParser extends MechanismFieldParser {
  parseDefinition (name, value) {
    const field = new Field.PlaybookField(name, this.context.typeParser.parseUsage(value))
    return this.save(field)
  }
}

export class CharacterFieldParser extends MechanismFieldParser {
  parseDefinition (name, value) {
    const field = CHOICE_FLAG.execute(value, {
      onTrue: choiceValue => this.parseChoiceField(name, choiceValue),
      onFalse: () => this.parseValueField(name, value)
    })

    return this.save(field)
  }

  parseChoiceField (name, choiceValue) {
    const choice = this.context.choiceParser.parseUsage(name, choiceValue)
    choice.name = choice.name || name
    return new Field.ChoiceField(name, choice)
  }

  parseValueField (name, value) {
    return AUTO_FLAG.execute(value, {
      onTrue: formula => new Field.FormulaField(name, formula),
      onFalse: () => new Field.ValueField(name, value)
    })
  }
}

const CHOICE_FLAG = new Flag.Prefix('choose')
const AUTO_FLAG = new Flag.Prefix('auto')

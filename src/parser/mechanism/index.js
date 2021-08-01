import TypeParser from './type'
import FieldParser from './field'
import ChoiceParser from './choice'
import FormulaParser from './formula'
import EffectParser from './effect'

import Mechanism from '../../models/rules/mechanism'

import { parseFields } from '../parsing-utils'

export default class MechanismParser {
  constructor (rawRules) {
    this.rawRules = rawRules
  }

  parse (name, rawMechanism) {
    this._reset()
    parseFields(rawMechanism, this._parsers(), this)
    return new Mechanism({
      name,
      types: this.typeParser.types,
      formulas: this.formulaParser.formulas,
      effects: this.effectParser.effects,
      choices: this.choiceParser.choices,
      globalFields: this.fieldParser.fields.global,
      playbookFields: this.fieldParser.fields.playbook,
      characterFields: this.fieldParser.fields.character
    })
  }

  _reset () {
    this.typeParser = new TypeParser(this)
    this.formulaParser = new FormulaParser(this)
    this.effectParser = new EffectParser(this)
    this.choiceParser = new ChoiceParser(this)
    this.fieldParser = new FieldParser(this)
  }

  _parsers () {
    return {
      types: this._collectionObjectParser('type'),
      formulas: this._collectionObjectParser('formula'),
      effects: this._collectionObjectParser('effect'),
      choices: this._collectionObjectParser('choice'),
      globalFields: this._collectionObjectParser('field', 'parseGlobalFieldDefinition'),
      playbookFields: this._collectionObjectParser('field', 'parsePlaybookFieldDefinition'),
      characterFields: this._collectionObjectParser('field', 'parseCharacterFieldDefinition'),
    }
  }
  _collectionObjectParser (name, method = 'parseDefinition') {
    return (collection, context) => {
      const parser = this[`${name}Parser`]
      return Object.entries(collection).map(([key, value]) => parser[method](key, value))
    }
  }
}

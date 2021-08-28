import TypeParser from './type'
import { GlobalFieldParser, PlaybookFieldParser, CharacterFieldParser } from './field'
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
      types: this.typeParser.data,
      formulas: this.formulaParser.data,
      effects: this.effectParser.data,
      choices: this.choiceParser.data,
      globalFields: this.globalFieldParser.data,
      playbookFields: this.playbookFieldParser.data,
      characterFields: this.characterFieldParser.data
    })
  }

  _reset () {
    this.typeParser = new TypeParser(this)
    this.formulaParser = new FormulaParser(this)
    this.effectParser = new EffectParser(this)
    this.choiceParser = new ChoiceParser(this)
    this.globalFieldParser = new GlobalFieldParser(this)
    this.playbookFieldParser = new PlaybookFieldParser(this)
    this.characterFieldParser = new CharacterFieldParser(this)
  }

  _parsers () {
    return {
      types: this._collectionObjectParser('type'),
      formulas: this._collectionObjectParser('formula'),
      effects: this._collectionObjectParser('effect'),
      choices: this._collectionObjectParser('choice'),
      globalFields: this._collectionObjectParser('globalField'),
      playbookFields: this._collectionObjectParser('playbookField'),
      characterFields: this._collectionObjectParser('characterField'),
    }
  }
  _collectionObjectParser (name, method = 'parseDefinition') {
    return (collection, context) => {
      const parser = this[`${name}Parser`]
      return Object.entries(collection).map(([key, value]) => parser[method](key, value))
    }
  }
}

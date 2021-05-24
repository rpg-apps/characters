import TypeParser from './type'
import FieldParser from './field'
import ChoiceParser from './choice'
import FormulaParser from './formula'
import EffectParser from './effect'

export default class Context {
  constructor (rawRules, externalParsers) {
    this.rawRules = rawRules
    this.typeParser = new TypeParser(this)
    this.choiceParser = new ChoiceParser(this)
    this.fieldParser = new FieldParser(this)
    this.formulaParser = new FormulaParser(this)
    this.effectParser = new EffectParser(this)
    Object.assign(this, externalParsers)
  }

  extract () {
    return {
      types: this.typeParser.types,
      choices: this.choiceParser.choices,
      fields: this.fieldParser.fields,
      formulas: this.formulaParser.formulas,
      effects: this.formulaParser.effects,
    }
  }
}
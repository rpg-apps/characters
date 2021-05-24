import TypeParser from './type'
import FieldsParser from './field'
import ChoiceParser from './choice'
import FormulaParser from './formula'
import EffectParser from './effect'

export default class Context {
  constructor (rawRules, externalParsers) {
    this.rawRules = rawRules
    this.typeParser = new TypeParser(this)
    this.choiceParser = new ChoiceParser(this)
    this.fieldsParser = new FieldsParser(this)
    this.formulaParser = new FormulaParser(this)
    this.effectParser = new EffectParser(this)
    Object.assign(this, externalParsers)
  }

  extract () {
    return {
      types: this.typeParser.types,
      choices: this.choiceParser.choices,
      fields: this.fieldsParser.fields,
      formulas: this.formulaParser.formulas,
      effects: this.formulaParser.effects,
    }
  }
}
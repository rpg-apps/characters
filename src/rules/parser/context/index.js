import TypeParser from './type'
import FieldsParser from './field'
import ChoiceParser from './choice'
import FormulaParser from './formula'
import EffectParser from './effect'

export default class Context {
  constructor (rawRules) {
    this.rawRules = rawRules
    this.typeParser = new TypeParser()
    this.choiceParser = new ChoiceParser(typeParser)
    this.fieldsParser = new FieldsParser(typeParser, choiceParser, rawRules)
    this.formulaParser = new FormulaParser(typeParser, fieldsParser)
    this.effectParser = new EffectParser(typeParser, fieldsParser)
  }
}
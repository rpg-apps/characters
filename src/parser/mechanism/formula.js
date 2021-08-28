import MechanismFieldParser from './mechanism_field_parser'
import Formula from '../../models/rules/mechanism/formula'

export default class FormulaParser extends MechanismFieldParser {
  constructor(context) {
    super(context, Formula.PRESETS, { saveBefore: true })
  }

  parseDefinition (pattern, definition, type) {
    const formula = new Formula.ComplexFormula(pattern, definition)
    return this.save(formula)
  }
}

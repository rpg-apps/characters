import Formula from '../../models/rules/mechanism/formula'

export default class FormulaParser {
  constructor(context) {
    this.context = context
    this.formulas = [].concat(Formula.PRESETS)
  }

  parseDefinition (pattern, definition, type) {
    const formula = new Formula.ComplexFormula(pattern, definition)
    this.formulas.unshift(formula)
    return formula
  }
}

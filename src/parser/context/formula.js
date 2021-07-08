import Formula from '../../models/rules/mechanism/formula'

export default class FormulaParser {
  constructor(context) {
    this.context = context
    this.formulas = [].concat(Formula.PRESETS)
  }

  parseDefinition (pattern, definition, type) {
    const formulaCall = this.parseUsage(definition)
    const formula = new Formula.ComplexFormula(pattern, formulaCall)
    this.formulas.push(formula)
    return formula
  }

  parseUsage (raw, type) {
    const formula = this.formulas.find(formula => formula.match(raw))
    if (!formula) return raw

    const params = formula.pattern.extract(raw)
    return new Formula.Call(formula, params)
  }
}

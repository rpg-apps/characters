import Formula from '../../models/rules/mechanism/formula'

export default class FormulaParser {
  constructor(context) {
    this.context = context
    this.formulas = [].concat(Formula.PRESETS)
  }

  parseDefinition (pattern, definition, type) {
    const formulaCall = this.parseUsage(definition)
    const formula = new Formula.ComplexFormula(pattern, formulaCall)
    this.formulas.unshift(formula)
    return formula
  }

  parseUsage (raw, type) {
    const formula = this.formulas.find(formula => formula.match(raw))
    if (!formula) {
      return this.parseRawValue(raw, type)
    }

    const params = formula.pattern.extract(raw, (v, t) => this.parseUsage(v, t))
    return new Formula.Call(formula, params)
  }

  parseRawValue (raw, typeName) {
    if (typeName) {
      let type = this.context.typeParser.types.find(t => t.name === typeName)
      if (type) return type.parseValue(raw)
    }
    return raw
  }
}

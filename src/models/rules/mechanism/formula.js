import Valuble from './base/valuble'
import Pattern from './base/pattern'

export default class Formula {
  constructor (pattern, type = undefined) {
    this.pattern = new Pattern(pattern)
    this.type = type
  }

  match (raw) {
    return this.pattern.match(raw)
  }

  getValue () {
    throw new Error('getValue should not be called on Formula class directly')
  }
}

Formula.PresetFormula = class PresetFormula extends Formula {
  constructor (pattern, type, getValue) {
    super(pattern, type)
    this.getValue = getValue
  }
}

Formula.ComplexFormula = class ComplexFormula extends Formula {
  constructor (pattern, formulaCall) {
    super(pattern)
    this.formulaCall = formulaCall
  }

  getValue (params, character) {
    return this.formulaCall.getValue(character)
  }
}

Formula.Call = class FormulaCall extends Valuble {
  constructor (formula, params) { // params are an object of raw strings to be calculated using the character/calculator.js calc function
    super()
    Object.assign(this, { formula, params })
  }

  match (raw) {
    return this.pattern.regex().exec(raw)
  }

  getValue (character, getValubleValue) {
    const parameterTypes = this.formula.pattern.getParameterTypes()
    const formulaParams = Object.entries(this.params)
      .reduce(([key, rawValue], params) => ({ ...params, [key]: getValubleValue(rawValue, parameterTypes[key]) }), { })
    return this.formula.getValue(formulaParams, character)
  }
}

Formula.PRESETS = [
  new Formula.PresetFormula('<boolean:condition>\\?<number:onTrue>:<number:onFalse>', 'number', params => (params.condition ? params.onTrue : params.onFalse)),
  
  new Formula.PresetFormula('<number:A>\\+<number:B>', 'number', params => params.A + params.B),
  new Formula.PresetFormula('<number:A>-<number:B>', 'number', params => params.A - params.B),
  new Formula.PresetFormula('<number:A>\\*<number:B>', 'number', params => params.A * params.B),
  new Formula.PresetFormula('<number:A>/<number:B>', 'number', params => params.A / params.B),

  new Formula.PresetFormula('<number:A>=<number:B>', 'boolean', params => params.A === params.B),
  new Formula.PresetFormula('<number:A>><number:B>', 'boolean', params => params.A > params.B),
  new Formula.PresetFormula('<number:A><<number:B>', 'boolean', params => params.A < params.B),
  new Formula.PresetFormula('<number:A><=<number:B>', 'boolean', params => params.A <= params.B),
  new Formula.PresetFormula('<number:A>>=<number:B>', 'boolean', params => params.A >= params.B),
  new Formula.PresetFormula('<number:A>!=<number:B>', 'boolean', params => params.A !== params.B),

  new Formula.PresetFormula('<boolean:A>\\|<boolean:B>', 'boolean', params => params.A || params.B),
  new Formula.PresetFormula('<boolean:A>\\&<boolean:B>', 'boolean', params => params.A && params.B),
  new Formula.PresetFormula('!<boolean:A>', 'boolean', params => !params.A),

  new Formula.PresetFormula('<array:A> or <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> join <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> and <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),
  new Formula.PresetFormula('<array:A> cross <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),

  new Formula.PresetFormula('<numebr:amount>d<number:dice>', 'number', params =>
  	new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)),
]

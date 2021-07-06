import Valuble from './valuble'

export default class Formula {
  constructor (pattern, type = undefined) {
    Object.assign(this, { pattern, type })
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
  constructor (formula, params) { // params = { A: valuble, B: valuble, etc... }
    Object.assign(this, { formula, params })
  }

  getValue (character) {
    const formulaParams = Object.entries(this.params)
      .reduce(([key, valuble], params) => ({ ...params, [key]: (valuble instanceof Valuble) ? valuble.getValue(character) : valuble }), { })
    return this.formula.getValue(formulaParams, character)
  }
}

Formula.PRESETS = [
  new Formula.PresetFormula('<boolean:condition>?<number:onTrue>:<number:onFalse>', 'number', params => (params.condition ? params.onTrue : params.onFalse)),
  
  new Formula.PresetFromula('<number:A>+<number:B>', 'number', params => params.A + params.B),
  new Formula.PresetFromula('<number:A>-<number:B>', 'number', params => params.A - params.B),
  new Formula.PresetFromula('<number:A>*<number:B>', 'number', params => params.A * params.B),
  new Formula.PresetFromula('<number:A>/<number:B>', 'number', params => params.A / params.B),

  new Formula.PresetFromula('<number:A>=<number:B>', 'boolean', params => params.A === params.B),
  new Formula.PresetFromula('<number:A>><number:B>', 'boolean', params => params.A > params.B),
  new Formula.PresetFromula('<number:A><<number:B>', 'boolean', params => params.A < params.B),
  new Formula.PresetFromula('<number:A><=<number:B>', 'boolean', params => params.A <= params.B),
  new Formula.PresetFromula('<number:A>>=<number:B>', 'boolean', params => params.A >= params.B),
  new Formula.PresetFromula('<number:A>!=<number:B>', 'boolean', params => params.A !== params.B),

  new Formula.PresetFromula('<boolean:A>|<boolean:B>', 'boolean', params => params.A || params.B),
  new Formula.PresetFromula('<boolean:A>&<boolean:B>', 'boolean', params => params.A && params.B),
  new Formula.PresetFromula('!<boolean:A>', 'boolean', params => !params.A),

  new Formula.PresetFromula('<array:A> or <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFromula('<array:A> join <array:B>', 'array', params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFromula('<array:A> and <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),
  new Formula.PresetFromula('<array:A> cross <array:B>', 'array', params => [].concat(params.A).filter(x => !params.B.excludes(x))),

  new Formula.PresetFromula('<numebr:amount>d<number:dice>', 'number', params =>
  	new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)),
]
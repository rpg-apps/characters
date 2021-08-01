import Valuble from './base/valuble'
import Pattern from './base/pattern'

export default class Formula extends Valuble {
  constructor (pattern, type = undefined) {
    super()
    this.pattern = new Pattern(pattern)
    this.type = type
  }

  match (raw) {
    return this.pattern.match(raw)
  }

  async getValue () {
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

  async getValue (params, character, getValubleValue) {
    return this.formulaCall.getValue(character, getValubleValue)
  }
}

Formula.PRESETS = [
  new Formula.PresetFormula('<boolean:condition>\\?<number:onTrue>:<number:onFalse>', 'number', async params => (params.condition ? params.onTrue : params.onFalse)),
  
  new Formula.PresetFormula('<number:A>\\+<number:B>', 'number', async params => params.A + params.B),
  new Formula.PresetFormula('<number:A>-<number:B>', 'number', async params => params.A - params.B),
  new Formula.PresetFormula('<number:A>\\*<number:B>', 'number', async params => params.A * params.B),
  new Formula.PresetFormula('<number:A>/<number:B>', 'number', async params => params.A / params.B),

  new Formula.PresetFormula('<number:A>=<number:B>', 'boolean', async params => params.A === params.B),
  new Formula.PresetFormula('<number:A>><number:B>', 'boolean', async params => params.A > params.B),
  new Formula.PresetFormula('<number:A><<number:B>', 'boolean', async params => params.A < params.B),
  new Formula.PresetFormula('<number:A><=<number:B>', 'boolean', async params => params.A <= params.B),
  new Formula.PresetFormula('<number:A>>=<number:B>', 'boolean', async params => params.A >= params.B),
  new Formula.PresetFormula('<number:A>!=<number:B>', 'boolean', async params => params.A !== params.B),

  new Formula.PresetFormula('<boolean:A>\\|<boolean:B>', 'boolean', async params => params.A || params.B),
  new Formula.PresetFormula('<boolean:A>\\&<boolean:B>', 'boolean', async params => params.A && params.B),
  new Formula.PresetFormula('!<boolean:A>', 'boolean', async params => !params.A),

  new Formula.PresetFormula('<array:A> or <array:B>', 'array', async params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> join <array:B>', 'array', async params => [].concat(params.A).concat(params.B)),
  new Formula.PresetFormula('<array:A> and <array:B>', 'array', async params => [].concat(params.A).filter(x => !params.B.excludes(x))),
  new Formula.PresetFormula('<array:A> cross <array:B>', 'array', async params => [].concat(params.A).filter(x => !params.B.excludes(x))),

  new Formula.PresetFormula('<numebr:amount>d<number:dice>', 'number', async params =>
  	new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)),
]

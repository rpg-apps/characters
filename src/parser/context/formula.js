// TODO better deal with params
// TODO field and type values

import { ParsingError, mapSmolJSON } from '../parsing-utils'

import Formula from '../../models/rules/context/formula'

export default class FormulaParser {
  constructor(context) {
    this.context = context
    this.formulas = [].concat(PRESET_FORMULAS)
  }

  parseDefinition (pattern, definition) {
    pattern = this.context.patternParser(pattern)
    const formulaCall = this.parseUsage(definition, { params: pattern.params })
    const formula = new Formula.ComplexFormula(pattern, formulaCall)
    this.formulas.push(formula)
    return formula
  }

  parseUsage (rawFormula, { type = undefined, params = [] } = { }) {
    if (rawFormula.constructor !== String) {
      throw new ParsingError('WTF why is there a formula that is not a STRING?!')
    }

    if (rawFormula.match(/^{(.+?,)+?(.+?)}$/)) {
      return mapSmolJSON(rawFormula, (key, value) => this.parseUsage(value, { type, params }))
    }

    const existingFormula = this.formulas.find(formula => formula.pattern.matching(rawFormula))
    if (existingFormula && (!type || !existingFormula.type || existingFormula.type === type)) {
      return Formula.Call(existingFormula, existingFormula.pattern.getParams())
    }
    
    if (params.includes(rawFormula)) {
      return Formula.Param(rawFormula)
    }

    const field = this.context.fieldParser.allFields().find(field => field.name === rawFormula)
    if (field) {
      return { pattern: 'field', getValue: () => field.value }
    }

    if (type) {
      return { pattern: type, getValue: () => this.context.typeParser.parseValue(rawFormula, type, params) }
    }
  }
}

const PRESET_FORMULAS = [
  { pattern: '<boolean:condition>?<number:onTrue>:<number:onFalse>', type: 'number', getValue: params => (params.condition ? params.onTrue : params.onFalse) },
  
  { pattern: '<number:A>+<number:B>', type: 'number', getValue: params => params.A + params.B },
  { pattern: '<number:A>-<number:B>', type: 'number', getValue: params => params.A - params.B },
  { pattern: '<number:A>*<number:B>', type: 'number', getValue: params => params.A * params.B },
  { pattern: '<number:A>/<number:B>', type: 'number', getValue: params => params.A / params.B },

  { pattern: '<number:A>=<number:B>', type: 'boolean', getValue: params => params.A === params.B },
  { pattern: '<number:A>><number:B>', type: 'boolean', getValue: params => params.A > params.B },
  { pattern: '<number:A><<number:B>', type: 'boolean', getValue: params => params.A < params.B },
  { pattern: '<number:A><=<number:B>', type: 'boolean', getValue: params => params.A <= params.B },
  { pattern: '<number:A>>=<number:B>', type: 'boolean', getValue: params => params.A >= params.B },
  { pattern: '<number:A>!=<number:B>', type: 'boolean', getValue: params => params.A !== params.B },

  { pattern: '<boolean:A>|<boolean:B>', type: 'boolean', getValue: params => params.A || params.B },
  { pattern: '<boolean:A>&<boolean:B>', type: 'boolean', getValue: params => params.A && params.B },
  { pattern: '!<boolean:A>', type: 'boolean', getValue: params => !params.A },

  { pattern: '<array:A> or <array:B>', type: 'array', getValue: params => [].concat(params.A).concat(params.B) },
  { pattern: '<array:A> and <array:B>', type: 'array', getValue: params => [].concat(params.A).filter(x => !params.B.excludes(x)) },

  {
    pattern :'<numebr:amount>d<number:dice>',
    type: 'number',
    getValue: params => new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)
  }
  // TODO add max/min and input
]

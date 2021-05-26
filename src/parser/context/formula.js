import { PatternParser } from '../parsing-utils'

export default class FormulaParser {
  constructor(context) {
    this.context = context
    this.patternParser = new PatternParser()
    this.formulas = [].concat(PRESET_FORMULAS)
  }

  // // When defining a formula in the 'formulas' fields.
  parseDefinition (pattern, definition) {
    const matchParams = this.patternParser.paramNames({ pattern })
    definition = this.parseUsage(definition, { params: matchParams })
    const formula = { pattern, getValue: params => definition.getValue(params) }
    this.formulas.push(formula)
    return formula
  }

  // When using a 'formula' in another context.
  parseUsage (rawFormula, { type = undefined, params = [] } = { }) {
    if (rawFormula.constructor !== String) {
      return { pattern: '', getValue: () => rawFormula }
    }

    if (rawFormula.match(/^{(.+?,)+?(.+?)}$/)) {
      return rawFormula
        .substring(1, rawFormula.length - 1).split(',')
        .reduce((obj, part) => {
          const [key, value] = part.includes(':') ? part.split(':') : [part, part]
          return { ...obj, [key]: this.parseUsage(value, { type, params }) }
        }, { })
    }

    const existingFormula = this.formulas.find(formula => this.patternParser.matching(formula, rawFormula))
    if (existingFormula && (!type || !existingFormula.type || existingFormula.type === type)) {
      return { pattern: '', getValue: params => {
        params = { ...params, ...this.patternParser.getParams(existingFormula, rawFormula, params, (raw, options) => this.parseUsage(raw, options)) }
        return existingFormula.getValue(params)
      } }
    }
    
    if (params.includes(rawFormula)) {
      return { pattern: '', getValue: params => params[rawFormula] }
    }

    const field = this.context.fieldParser.allFields().find(field => field.name === rawFormula)
    if (field) {
      return { pattern: '', getValue: () => field.value }
    }

    if (type) {
      return { pattern: '', getValue: () => this.context.typeParser.parseValue(rawFormula, type, params) }
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

  {
    pattern :'<numebr:amount>d<number:dice>',
    type: 'number',
    getValue: params => new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)
  }
]

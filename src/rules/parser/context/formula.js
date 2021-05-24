import { ParsingError, PatternParser } from '../parsing-utils'

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
    if (rawFormula.match(/^{(.+?,)+?(.+?)}$/)) {
      return rawFormula
        .substring(1, str.length - 1).split(',')
        .reduce((obj, part) => {
          const [key, value] = part.includes(':') ? part.split(':') : [part, part]
          return { ...obj, [key]: parseUsage(value, { type, params }) }
        }, { })
    }

    const existingFormula = this.formulas.find(formula => this.patternParser.matching(formula, rawFormula))
    if (existingFormula) {
      return { formula: existingFormula, params: this.patternParser.getParams(existingFormula, rawFormula, params, (raw, options) => this.parseUsage(raw, options)) }
    }
    
    if (params.includes(rawFormula)) {
      return { pattern: '', getValue: params => params[rawFormula] }
    }

    const field = this.context.fieldParser.existingFields().find(field => field.name === rawFormula)
    if (field) {
      return { pattern: '', getValue: () => field.value }
    }

    if (type) {
      return { pattern: '', getValue: () => this.context.typesParser.parseValue(rawFormula, type, params) }
    }
  }
}

const PRESET_FORMULAS = [
  { pattern: '<boolean:condition>?<number:onTrue>:<number:onFalse>', getValue: params => (params.condition ? params.onTrue : params.onFalse) },
  
  { pattern: '<number:A>+<number:B>', getValue: params => params.A + params.B },
  { pattern: '<number:A>-<number:B>', getValue: params => params.A - params.B },
  { pattern: '<number:A>*<number:B>', getValue: params => params.A * params.B },
  { pattern: '<number:A>/<number:B>', getValue: params => params.A / params.B },

  { pattern: '<number:A>=<number:B>', getValue: params => params.A === params.B },
  { pattern: '<number:A>><number:B>', getValue: params => params.A > params.B },
  { pattern: '<number:A><<number:B>', getValue: params => params.A < params.B },
  { pattern: '<number:A><=<number:B>', getValue: params => params.A <= params.B },
  { pattern: '<number:A>>=<number:B>', getValue: params => params.A >= params.B },
  { pattern: '<number:A>!=<number:B>', getValue: params => params.A != params.B },

  { pattern: '<boolean:A>|<boolean:B>', getValue: params => params.A || params.B },
  { pattern: '<boolean:A>&<boolean:B>', getValue: params => params.A && params.B },
  { pattern: '!<number:A>', getValue: params => !params.A },

  {
    pattern :'<numebr:amount>d<number:dice>',
    getValue: params => new Array(params.amount).fill(1).map(() => Math.ceil(Math.random() * params.dice)).reduce((sum, val) => sum + val, 0)
  }
]

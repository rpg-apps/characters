/*
Formula parser:

stuff to include:
 - raw numbers
 - rolls (roll, d6, etc)
 - variables from context:
   - character/playbook fields
   - previous rolls (last_roll, last_d6, etc.)
 - math: +, -, /, *
 - euqations: =, >, <, <=, >=
 - set =
 - replace values something=something (roll=d6+d8)
 - status of equipment: equip(armor), equip(weapon)
*/

export default class FormulaParser {
  constructor(formulas) {
    this.formulas = [].concat(formulas)
  }

  // When defining a formula in the 'formulas' fields.
  parseDefinition (rawFormula) {
    const formula = undefined
    this.formulas.push(formula)
  }

  // When using a 'formula' in another context.
  parseUsage (rawFormula) {
    const formula = undefined
    return formula
  }
}

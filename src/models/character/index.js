import Calculator from './calculator'
import History from './history'

import Field from '../rules/mechanism/field'

export default class Character {
  constructor (playbook) {
    this.playbook = playbook
    this.creationChoices = {}
    this.calculator = new Calculator(this)
    this.history = new History()
  }

  // Called after character creation
  initialize () {
    this.fields = this.playbook.characterFields
      .filter(field => field instanceof Field.ValueField)
      .reduce((fields, field) => ({ ...fields, [field.name]: this.get(field.initializationFormula) }))
  }

  get (raw) {
    return this.calculator.calc(raw)
  }

  trigger (moveName, executioner) {
    const move = this.moves.find(({ name }) => name === moveName)
    if (move) {
      this.execute(move.effect, executioner)
    }
  }

  execute(effectCall, executioner) { // an executioner has the ability to display an output and recieve an input
    return this.calculator.execute(effectCall, this, executioner)
  }
}

/*
{
  creationChoices: { <choice name>: value, ... },
  fields: { <field name>: value, ... }, // fields are initialized using calc, but can be changed, unless they are auto
  modifiers: [{ filter: () => { should the modifier be used? }, value: formula, once: boolean }...],
  history: [] // a History object containing array of effects and values calculated, with metadata on each event
  // TODO history
}
 */

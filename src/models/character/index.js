import Calculator from './calculator'
import History from './history'

export default class Character {
  constructor (playbook) {
    this.playbook = playbook
    this.creationChoices = {}
    this.calculator = new Calculator(playbook)
    this.modifiers = []
    this.history = new History()
  }

  async get (raw, modifierRelevanceManager = undefined) {
    let modifiers = []
    if (modifierRelevanceManager) {
      modifiers = await modifierRelevanceManager.filterRelevantModifiers(this.modifiers)
    }
    const modifierValues = modifiers.map(async modifier => await this.get(modifier))
    return this.calculator.calc(raw) + modifierValues.reduce((sum, value) => sum + value, 0)
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

  static load (data, rules) {
    // TODO
    return data
  }
}

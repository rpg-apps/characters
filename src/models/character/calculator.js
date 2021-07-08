export default class Calculator {
  constructor (playbook) {
    this.playbook = playbook
    this.valubles = []
      .concat(this.playbook.choices)
      .concat(this.playbook.characterFields)
      .concat(this.playbook.playbookFields)
      .concat(this.playbook.globalFields)
      .concat(this.playbook.formulas)
      .concat(this.playbook.effects)
  }

  calc (raw, character, type = undefined) {
    const valuble = this.valubles.find(valuble => valuble.match(raw))
    
    if (valuble)
      return valuble.getValue(character, (rawValue, type) => this.calc(rawValue, this, type))

    return this.playbook.types.find(t => t.name === type)?.parseValue(raw) || raw
  }

  async execute (effectCall, character, executioner) { // an executioner has the ability to display an output and recieve an input
    if (Array.isArray(effectCall)) {
      for(let effect of effectCall) {
        await this.execute(effect, character, executioner)
      }
    }
    const action = this.calc(effectCall, character)
    return await action(executioner)
  }
}
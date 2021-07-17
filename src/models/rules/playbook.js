import Mechanism from './mechanism'

export default class Playbook {
  constructor (fields) {
    Object.assign(this, fields)
  }

  setRules (rulebook) {
    this.rules = Mechanism.join(...[].concat(rulebook.mechanisms).concat(this.mechanisms || []))
  }
}

// fields = { choices, characterFields, playbookFields, globalFields, formulas, mechanisms }
// playbookFields are just key value
// All of which are assigned when creating it from the rulebook in the parser
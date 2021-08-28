import Valuable from './base/valuable'

export default class Choice extends Valuable {
  constructor (name, type, playbook = 'all') {
    super(playbook)
    Object.assign(this, { name, type, playbook })
  }

  match (raw) {
    return raw === this.name
  }

  async getValue (character) {
    return character.creationChoices[this.name]
  }
}

Choice.Usage = class ChoiceUsage extends Valuable {
  constructor (choice, field = 'root') {
    super()
    Object.assign(this, { choice, field })
  }

  match (raw) {
    return this.choice.match(raw)
  }

  async getValue (character) {
    const originalChoiceValue = this.originalChoice.getValue(character)
    if (this.field === 'root' || this.field === undefined)  return originalChoiceValue
    return originalChoiceValue?.[this.field]
  }
}

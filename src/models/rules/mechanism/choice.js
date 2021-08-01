import Valuble from './base/valuble'

export default class Choice extends Valuble {
  constructor (playbook = 'all') {
    super()
    this.playbook = playbook
  }

  match (raw) {
    return raw === this.toString()
  }
}

Choice.BasicChoice = class BasicChoice extends Choice {
  constructor (name, type, playbook, free = false) {
    super(playbook)
    Object.assign(this, { name, type, free })
  }

  async getValue (character) {
    return character.creationChoices[this.name]
  }
}

Choice.ProxyChoice = class ProxyChoice extends Choice {
  constructor (originalChoice, field = 'root') {
    super(originalChoice.playbook)
    Object.assign(this, { originalChoice, field })
  }

  async getValue (character) {
    const originalChoiceValue = this.originalChoice.getValue(character)
    if (this.field === 'root' || this.field === undefined)  return originalChoiceValue
    return originalChoiceValue?.[this.field]
  }
}

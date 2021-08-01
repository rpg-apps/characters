import Character from '../character'

export default class CharacterBuilder {
  constructor (rulebook) {
    this.rulebook = rulebook
    this.status = CharacterBuilder.STATUS.CHOSING_PLAYBOOK
    this.choice = null
  }

  choosePlaybook (playbookName) {
    this._validateStatus(CharacterBuilder.STATUS.CHOSING_PLAYBOOK)
    this.playbook = this.rulebook.playbooks.find(playbook => playbook.name === playbookName)
    if (!this.playbook) {
      throw new Error(`Playbook not found: ${playbookName}`)
    }
    this.character = new Character(this.playbook)
    this.status = CharacterBuilder.STATUS.CHOOSING_CHARACTER_TRAITS
    this.nextChoice()
  }

  chooseCharacterTrait (name, value) {
    this._validateStatus(CharacterBuilder.STATUS.CHOOSING_CHARACTER_TRAITS)
    this.character.creationChoices[name] = value
    this.nextChoice()
    if (!this.choice) {
      this.status = CharacterBuilder.STATUS.DONE
    }
  }

  nextChoice () {
    this.choice = this.playbook.choices.find(choice => !this.character.creationChoices.hasOwnProperty(choice.name))
  }

  _validateStatus (status) {
    if (this.status !== status) {
      throw new Error('Illegal operation. Character builder not at this stage')
    }
  }
}


CharacterBuilder.STATUS = {
  CHOSING_PLAYBOOK: 'choosing playbook',
  CHOOSING_CHARACTER_TRAITS: 'choosing character traits',
  DONE: 'done'
}

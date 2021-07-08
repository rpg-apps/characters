import Character from '../character'

export default class CharacterBuilder {
  constructor (playbook, rulebook) {
    this.playbook = playbook
    this.rulebook = rulebook
    this.choices = this.loadChoices()
    this.currentChoices = [this.choices[0]]
    this.character = new Character({ playbook, rulebook })
    this.done = false
  }

  loadFields () {
    return this.load('fields')
  }

  loadChoices () {
    return this.load('choices')
      .map(choice => ({ ...choice, value: undefined }))
  }

  choose (choice, value) {
    choice.value = value
    this.currentChoices = [this.choices[this.choices.indexOf(choice)+1]]
    if (this.currentChoices === undefined) {
      this.done = true
    }
  }

  load (key) {
    return this.rulebook.context[key].filter(({ playbook }) => playbook === 'all' || playbook === this.playbook.name || playbook === undefined)
  }

  getValue (fieldName) {
    const field = this.load('fields').find(({ name }) => name === fieldName)
    if (!field) {
      return undefined
    }

    if (field.choice) {
      return field.choice.value
    } else {
      return this.playbook.getValue(fieldName)      
    }
  }
}
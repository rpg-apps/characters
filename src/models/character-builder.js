import Character from './character'

export default class CharacterBuilder {
  constructor (playbook, rulebook) {
    this.playbook = playbook
    this.rulebook = rulebook
    this.choices = this.loadChoices()
    this.character = new Character({ playbook, rulebook })
  }

  loadFields () {
    return this.load('fields')
  }

  loadChoices () {
    return this.load('choices')
  }

  choose (choice, selection) {
    
  }

  load (key) {
    return this.rulebook.context[key].filter(({ playbook }) => playbook === 'all' || playbook === this.playbook.name || playbook === undefined)
  }
}

import Valuble from './valuble'

export default class Field extends Valuble {
  constructor (name, scope) {
    Object.assign(this, { name, scope })
  }

  getValue (character) {
    throw new Error('getValue should not be called on Field class directly')
  }
}

Field.SCOPE = {
  GLOBAL: 'global',
  PLAYBOOK: 'playbook',
  CHARACTER: 'character'
}

Field.GlobalField = class GlobalField extends Field {
  constructor (name, value) {
    super(name, Field.SCOPE.GLOBAL)
    this.value = value
  }

  getValue () {
    return this.value
  }
}

Field.PlaybookField = class PlaybookField extends Field {
  constructor (name, type, optional) {
    super(name, Field.SCOPE.PLAYBOOK)
    Object.assign(this, { type, optional })
  }

  getValue (character) {
    return character.playbook[this.name]
  }
}

Field.CharacterField = class CharacterField extends Field {
  constructor (name, playbook='all') {
    super(name, Field.SCOPE.CHARACTER)
    this.playbook = playbook
  }
}

Field.ChoiceField = class ChoiceField extends Field.CharacterField {
  constructor (name, playbook, choice) {
    super(name, playbook)
    this.choice = choice
  }

  getValue (character) {
    return character.choices.find(choice => choice.name === this.choice.name).value
  }
}

Field.FormulaField = class FormulaField extends Field.CharacterField {
  constructor (name, playbook, formulaCall) {
    super(name, playbook)
    this.formulaCall = formulaCall
  }

  getValue (character) {
    return formulaCall.getValue(character)
  }
}
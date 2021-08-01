import Valuble from './base/valuble'

export default class Field extends Valuble {
  constructor (name, scope) {
    super()
    Object.assign(this, { name, scope })
  }

  async getValue (character) {
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

  async getValue () {
    return this.value
  }
}

Field.PlaybookField = class PlaybookField extends Field {
  constructor (name, type, optional) {
    super(name, Field.SCOPE.PLAYBOOK)
    Object.assign(this, { type, optional })
  }

  async getValue (character) {
    return character.playbook.fields[this.name]
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

  async getValue (character) {
    return this.choices.getValue(character)
  }
}

Field.FormulaField = class FormulaField extends Field.CharacterField {
  constructor (name, playbook, calculationFormula) {
    super(name, playbook)
    this.calculationFormula = calculationFormula
  }

  async getValue (character) {
    return await character.get(this.calculationFormula)
  }
}

Field.ValueField = class ValueField extends Field.CharacterField {
  constructor (name, playbook, initializationFormula) {
    super(name, playbook)
    this.initializationFormula = initializationFormula
  }

  async getValue (character) {
    return character.fields[this.name]
  }
}

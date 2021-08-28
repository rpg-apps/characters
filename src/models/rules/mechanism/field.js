import Valuable from './base/valuable'

export default class Field extends Valuable {
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
  constructor (name, type) {
    super(name, Field.SCOPE.PLAYBOOK)
    Object.assign(this, { type })
  }

  async getValue (character) {
    return character.playbook.fields[this.name]
  }
}

Field.CharacterField = class CharacterField extends Field {
  constructor (name) {
    super(name, Field.SCOPE.CHARACTER)
  }
}

Field.ChoiceField = class ChoiceField extends Field.CharacterField {
  constructor (name, choiceUsage) {
    super(name)
    this.choiceUsage = choiceUsage
  }

  async getValue (character) {
    return this.choiceUsage.getValue(character)
  }
}

Field.FormulaField = class FormulaField extends Field.CharacterField {
  constructor (name, calculationFormula) {
    super(name)
    this.calculationFormula = calculationFormula
  }

  async getValue (character) {
    return await character.get(this.calculationFormula)
  }
}

Field.ValueField = class ValueField extends Field.CharacterField {
  constructor (name, initializationFormula) {
    super(name)
    this.initializationFormula = initializationFormula
  }

  async getValue (character) {
    return character.fields[this.name]
  }
}

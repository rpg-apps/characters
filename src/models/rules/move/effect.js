const Effect = class Effect { }

Effect.Text = class TextEffect extends Effect {
  constructor(text) {
    super()
    Object.assign(this, { text })
  }
}

Effect.Change = class ChangeEffect extends Effect {
  constructor(field, action, formula) {
    super()
    Object.assign(this, { field, action, formula })
  }
}

Effect.Modify = class ModificationEffect extends Effect {
  constructor(filter, formula, options) {
    super()
    Object.assign(this, { filter, formula, options })
  }
}

Effect.Roll = class Roll extends Effect {
  constructor (formula, outcomes) {
    super()
    Object.assign(this, { formula, outcomes })
  }
}

Effect.Choice = class Choice extends Effect {
  constructor (text, options, count = 1) {
    super()
    Object.assign(this, { text, options, count })
  }
}

Effect.Condition = class Condition extends Effect {
  constructor (formula, onTrue, onFalse) {
    super()
    Object.assign(this, { formula, onTrue, onFalse })
  }
}

Effect.TriggerMove = class TriggerMove extends Effect {
  constructor (moveName) {
    super()
    Object.assign(this, { moveName })
  }
}

Effect.NONE = 'Nothing happens'

export default Effect
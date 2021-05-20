Effect = class Effect { }

Effect.Text = class TextEffect extends Effect {
  constructor(text) {
    Object.assign(this, { text })
  }
}

Effect.Change = class ChangeEffect extends Effect {
  constructor(field, action, formula) {
    Object.assign(this, { field, action, formula })
  }
}

Effect.Modify = class ModificationEffect extends Effect {
  constructor(filter, formula, options) {
    Object.assign(this, { filter, formula, options })
  }
}

Effect.Roll = class Roll extends Effect {
  constructor (formula, outcomes) {
    Object.assign(this, { formula, outcomes })
  }
}

Effect.Choice = class Choice extends Effect {
  constructor (text, options, count = 1) {
    Object.assign(this, { text, options, count })
  }
}

Effect.Condition = class Condition extends Effect {
  constructor (formula, onTrue, onFalse) {
    super()
    Obejct.assign(this, { formula, onTrue, onFalse })
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
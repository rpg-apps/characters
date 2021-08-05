import Trigger from './trigger'

class BasicMove {
  constructor({ name, type, text }) {
    Object.assign(this, { name, type, text })
  }
}

class Move extends BasicMove {
  constructor ({ name, type, text, trigger, effect, replaces, requires }) {
    super({ name, type, text })
    Object.assign(this, { trigger, effect, replaces, requires })
  }
}

// Multilclass moves are a special kind of move that allows you to chose from another class
Move.Multiclass = class MulticlassMove extends BasicMove {
  constructor ({ name, type, text, classRestrictions, levelRestrictions }) {
    super({ name, type, text })
    Object.assing(this, { classRestrictions, levelRestrictions })
  }
}

Move.BasicMove = BasicMove
Move.Trigger = Trigger

export default Move

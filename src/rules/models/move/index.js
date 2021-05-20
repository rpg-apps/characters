import Effect from './effect'
import Trigger from './trigger'

class BasicMove {
  constructor({ name, text }) {
    Object.assign(this, { name, text })
  }
}

class Move extends BasicMove {
  constructor ({ name, text, trigger, effect, replaces, requires }) {
    super({ name, text })
    Object.assign(this, { trigger, effect, replaces, requires })
  }
}

// Multilclass moves are a spcecial kind of move that allows you to chose from another class
Move.Multiclass = class MulticlassMove extends BasicMove {
  constructor ({ name, text, classRestrictions, levelRestrictions }) {
    super({ name, text })
    Object.assing(this, { classRestrictions, levelRestrictions })
  }
}

Move.BasicMove = BasicMove
Move.Effect = Effect
Move.Trigger = Trigger

export default Move
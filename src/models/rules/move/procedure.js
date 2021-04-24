/*
so far:

() - optional
<> - var name
{} - keys objects
[] - array

procedure:
either one effect or an array of effects

effects:
 - roll <formula>: { success, partial success/partial success also, miss }
 - choose <text>: { <option texts...> }
 - deal damage <formula>
 - take damage
 - modify <on> <formula> (forward|ongoing) (forced)
 - use gear (count) (with tag <tag>) (<equipment>)
 - hold <count>: { <option texts...> }
 - get <count>: { <option texts...> } // like hold but immediate
 - use: { <option texts...> } // usage for holds/gets
 - no effect
*/


import { DAMAGE } from '../stats'

class Procedure {
  constructor ({ trigger, effect }) {
    effect = effectize(effect)
    Object.assign(this, { trigger, effect })
  }
}

/* EFFECTS - this section describes the different effects that can occour */

Procedure.Effect = class Effect { }

Procedure.BasicEffect = class BasicEffect extends Procedure.Effect {
  constructor ({ text }) {
    super()
    Object.assign(this, { text })
  }
}

function effectize (something) {
  if (something.constructor === String) {
    return new Procedure.BasicEffect({ text: something })
  }
  return something
}

// When required to roll and do something according to the result: "roll+WIS", "roll+DEX"
// When there is no "miss" option in the move, it will be undefined here. This means the GM picks what happens.
Procedure.Roll = class Roll extends Procedure.Effect {
  constructor ({ formula, success, partialSuccess, miss }) {
    super()
    Object.assign(this, { formula, success: effectize(success), partialSuccess: effectize(partialSuccess) })
    if (miss) {
      this.miss = effectize(miss)
    }
  }  
}

// When required to choose between few options: "Name <something>", "Choose 3:"
Procedure.Choice = class Choice extends Procedure.Effect {
  constructor ({ text, options, count = 1 }) {
    super()
    options = options.map(({ text, effect }) => ({ text, effect: effectize(effect) }))
    Object.assign(this, { text, options, count })
  }
}

// When required to do damage to an enemy: "Deal damage", "Deal 2d4 of damage"
// damage is a formula can be undefined, when the default damage should be used.
Procedure.DealDamage = class DealDamage extends Procedure.Effect {
  constructor ({ damage }) {
    super()
    Object.assign(this, { damage: damage || DAMAGE })
  }
}

// When required to take damage.
// No formula for taking damage, because the damage is declared at the time of the event, and given by the GM.
Procedure.TakeDamage = class TakeDamage extends Procedure.Effect { }

// When required to use equipment, such as rations.
// requirements are the tags/name of the equipment needs to be used.
Procedure.UseGear = class UseGear extends Procedure.Effect {
  constructor ({ requirements, amount = 1 }) {
    super()
    Object.assign(this, { requirements, amount })
  }
}

// When updating a stat: "Add 1 to your level", "Reduce armor by 1", "Remove a debility"
Procedure.ChangeStat = class ChangeStat extends Procedure.Effect {
  constructor ({ stat, change }) {
    super()
    Object.assign(this, { stat, change })
  }
}

Procedure.AddAdvancedMove = class AddAdvancedMove extends Procedure.Effect { }
Procedure.Die = class Die extends Procedure.Effect { }

/* Special DW mechanics */

// When effecting another move/roll: "Take +1 ongoing against them", "Add d8 to your damage rolls"
// Options:
// Usages: how many times it counts. 1 for "forward", undefined for "ongoing"
// Forced if the modifier is cannot be saved for later, but must be used immediately.
Procedure.Modifier = class Modifier extends Procedure.Effect {
  constructor ({ formula, options }) {
    super()
    Object.assign(this, { formula }, options)
  }
}

// When given hold to use as you please: "Take 3 hold, use when..."
Procedure.Hold = class Hold extends Procedure.Effect {
  constructor ({ count, usageOptions }) {
    super()
    Object.keys(usageOptions).forEach(key => { usageOptions[key] = effectize(usageOptions[key]) })
    Object.assign(this, { count, usageOptions })
  }
}

/* Logical concpets */

// When two effects or more happens at the same time, independently: "Take 1 hold and choose one"
Procedure.Parallel = class Parallel extends Procedure.Effect {
  constructor ({ effects }) {
    super()
    Object.assign(this, { effects: effects.map(effectize) })
  }
}

// When two effects or more happens one after the other, dependently: "Take 1 hold and choose one"
Procedure.Series = class Series extends Procedure.Effect {
  constructor ({ effects }) {
    super()
    Object.assign(this, { effects: effects.map(effectize) })
  }
}

// When you take an effect depending on the result of a logical condition: "If you have enough power, level up"
Procedure.Condition = class Condition extends Procedure.Effect {
  constructor ({ formula, onTrue, onFalse }) {
    super()
    Obejct.assign(this, { formula, onTrue: effectize(onTrue), onFalse: effectize(onFalse) })
  }
}

// When one move triggers another move
Procedure.TriggerMove = class TriggerMove extends Procedure.Effect {
  constructor ({ moveTitle }) {
    super()
    Object.assign(this, { moveTitle })
  }
}

/* Useful constants for some of the procedures */

Procedure.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.
Procedure.NO_EFFECT = effectize('Nothing happens') // An effect for when nothing occours.

export default Procedure
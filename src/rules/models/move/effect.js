/*
so far:

() - optional
<> - var name
{} - keys objects
[] - array

procedure:
either one effect or an array of effects

triggers:
 - text
 - on <formula>

effects:
 / text
 / roll <formula:number>: { success, partial success/partial success also, miss }
 / choose <text>: { <option texts...> }
 / deal damage <formula:number>
 / take damage
 - modify <on> <formula:number> (forced) (forward|ongoing) (until <formula:boolean>)
 - use gear (count) (with tag <tag>) (<equipment>)
 - hold <count>: { <option texts...> }
 - get <count>: { <option texts...> } // like hold but immediate
 - use: { <option texts...> } // usage for holds/gets, can also be an array
 - no effect
 - change stat <stat> <formula:number>
 - die
 - is <formula:boolean>
 - trigger move: <move name>
 - resolve bond
 - add advanced move
*/


import { DAMAGE } from '../stats'

Effect = class Effect { }

Effect.BasicEffect = class BasicEffect extends Effect {
  constructor ({ text }) {
    super()
    Object.assign(this, { text })
  }
}

function effectize (something) {
  if (something.constructor === String) {
    return new Effect.BasicEffect({ text: something })
  }
  return something
}

// When required to roll and do something according to the result: "roll+WIS", "roll+DEX"
// When there is no "miss" option in the move, it will be undefined here. This means the GM picks what happens.
Effect.Roll = class Roll extends Effect {
  constructor (formula, { success, partialSuccess, miss }) {
    super()
    Object.assign(this, { formula, success: effectize(success), partialSuccess: effectize(partialSuccess) })
    if (miss) {
      this.miss = effectize(miss)
    }
  }  
}

// When required to choose between few options: "Name <something>", "Choose 3:"
Effect.Choice = class Choice extends Effect {
  constructor (text, options, count = 1) {
    super()
    options = options.map(({ text, effect }) => ({ text, effect: effectize(effect) }))
    Object.assign(this, { text, options, count })
  }
}

// When required to do damage to an enemy: "Deal damage", "Deal 2d4 of damage"
// damage is a formula can be undefined, when the default damage should be used.
Effect.DealDamage = class DealDamage extends Effect {
  constructor (formula) {
    super()
    Object.assign(this, { formula: formula || DAMAGE })
  }
}

// When required to take damage.
// No formula for taking damage, because the damage is declared by the GM at the time of the event.
Effect.TakeDamage = class TakeDamage extends Effect { }

// When required to use equipment, such as rations.
// requirements are the tags/name of the equipment needs to be used.
Effect.UseGear = class UseGear extends Effect {
  constructor ({ requirements, amount = 1 }) {
    super()
    Object.assign(this, { requirements, amount })
  }
}

// When updating a stat: "Add 1 to your level", "Reduce armor by 1", "Remove a debility"
Effect.ChangeStat = class ChangeStat extends Effect {
  constructor ({ stat, change }) {
    super()
    Object.assign(this, { stat, change })
  }
}

Effect.AddAdvancedMove = class AddAdvancedMove extends Effect { }
Effect.Die = class Die extends Effect { }

/* Special DW mechanics */

// When effecting another move/roll: "Take +1 ongoing against them", "Add d8 to your damage rolls"
// Options:
// Usages: how many times it counts. 1 for "forward", undefined for "ongoing"
// Forced if the modifier is cannot be saved for later, but must be used immediately.
Effect.Modifier = class Modifier extends Effect {
  constructor (formula, options) {
    super()
    Object.assign(this, { formula }, options)
  }
}

// When given hold to use as you please: "Take 3 hold, use when..."
Effect.Hold = class Hold extends Effect {
  constructor ({ count, usageOptions }) {
    super()
    Object.keys(usageOptions).forEach(key => { usageOptions[key] = effectize(usageOptions[key]) })
    Object.assign(this, { count, usageOptions })
  }
}

/* Logical concpets */

// When two effects or more happens at the same time, independently: "Take 1 hold and choose one"
Effect.Parallel = class Parallel extends Effect {
  constructor ({ effects }) {
    super()
    Object.assign(this, { effects: effects.map(effectize) })
  }
}

// When two effects or more happens one after the other, dependently: "Take 1 hold and choose one"
Effect.Series = class Series extends Effect {
  constructor ({ effects }) {
    super()
    Object.assign(this, { effects: effects.map(effectize) })
  }
}

// When you take an effect depending on the result of a logical condition: "If you have enough power, level up"
Effect.Condition = class Condition extends Effect {
  constructor ({ formula, onTrue, onFalse }) {
    super()
    Obejct.assign(this, { formula, onTrue: effectize(onTrue), onFalse: effectize(onFalse) })
  }
}

// When one move triggers another move
Effect.TriggerMove = class TriggerMove extends Effect {
  constructor ({ moveTitle }) {
    super()
    Object.assign(this, { moveTitle })
  }
}

/* Useful constants for some of the procedures */

Effect.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.
Effect.NO_EFFECT = effectize('Nothing happens') // An effect for when nothing occours.

export default Effect
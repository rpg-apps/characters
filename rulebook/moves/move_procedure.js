class Procedure {
	constructor (trigger, effect) {
		Object.assign(this, { trigger, effect })
	}

	static roll (formula, { success, partialSuccess, miss }) {
		return new Procedure.Roll(formula, { success, partialSuccess, miss })
	}

	static choice (text, options) {
		return new Procedure.Choice(text, options)
	}

	static effect (text) {
		return new Procedure.Effect.BasicEffect(text)
	}

	static noEffect () {
		return new Procedure.Effect.NoEffect()
	}

	static DoDamage (damageFormula) {
		return new Procedure.Effect.DoDamage(damageFormula)
	}

	static takeDamage (damageFormula) {
		return new Procedure.Effect.TakeDamage(damageFormula)
	}

	static useUpGear (equipment, amount) {
		return new Procedure.Effect.UseUpGear(equipment, amount)
	}

	static modifier (modifier, { on, usages, forced }) {
		return new Procedure.Effect.Modifier(modifier, { on, usages, forced })
	}

	static hold (count, usageOptions) {
		return new Procedure.Effect.Hold(count, usageOptions)
	}

	static multipleEffects (effects...) {
		return new Procedure.Effect.And(effects)
	}
}

Procedure.Roll = class Roll {
	constructor (formula, { success, partialSuccess, miss }) {
		Object.assign(this, { formula, success, partialSuccess, miss })
	}	
}

Procedure.Choice = class Choice {
	constructor (text, options) {
		Object.assign(this, { text, options })
	}
}

Procedure.Effect = class Effect { }

Procedure.Effect.BasicEffect = class BasicEffect extends Effect {
	constructor (text) {
		Object.assign(this, { text })
	}	
}

Procedure.Effect.NoEffect = class NoEffect extends Effect { }

Procedure.Effect.DoDamage = class DoDamage extends Procedure.Effect {
	constructor (damageFormula) { // damageFormula can be undefined, when the default damage should be used.
		Object.assign(this, { damageFormula })
	}
}

Procedure.Effect.TakeDamage = class TakeDamage extends Procedure.Effect {
	constructor () { // The GM tells the player what the damage is
	}
}

Procedure.Effect.UseUpGear = class UseUpGear extends Procedure.Effect {
	constructor (equipment, amount) {
		Object.assign(this, { equipment, amount })
	}
}

Procedure.Effect.ChangeStat = class ChangeStat extends Procedure.Effect {
	constructor (stat, change) {
		Object.assign(this, { stat, change })
	}
}

Procedure.Effect.Modifier = class Modifier extends Procedure.Effect {
	constructor (modifier, { on, usages, forced }) {
		Object.assign(this, { modifier, on, usages, forced })
	}
}

Procedure.Effect.Hold class Hold extends Procedure.Effect {
	constructor (count, usageOptions) {
		Object.assign(this, { count, usageOptions })
	}
}

Procedure.Effect.Multiple = class Multiple extends Procedure.Effect {
	constructor (effects) {
		Object.assign(this, { effects })
	}
}

Procedure.Effect.Condition = class Condition extends Procedure.Effect {
	constructor (condition, onTrue, onFalse) {
		Obejct.assign(this, { condition, onTrue, onFalse })
	}
}

Procedure.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.

Procedure.STATS = {
	HP: 'hp',
	XP: 'xp',
	LVL: 'level',
	ARMOR: 'armor',
	MAX_HP: 'maxHP'
}

export default Procedure
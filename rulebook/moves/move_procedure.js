class Procedure {
	constructor (trigger, effect) {
		effectize(effect)
		Object.assign(this, { trigger, effect })
	}

	static roll (formula, { success, partialSuccess, miss }) {
		return new Procedure.Roll(formula, { success, partialSuccess, miss })
	}

	static choice (text, options, count) {
		return new Procedure.Choice(text, options, count)
	}

	static effect (text) {
		return new Procedure.Effect.BasicEffect(text)
	}

	static noEffect () {
		return new Procedure.Effect.NoEffect()
	}

	static doDamage (damageFormula) {
		return new Procedure.Effect.DoDamage(damageFormula)
	}

	static takeDamage () {
		return new Procedure.Effect.TakeDamage()
	}

	static useUpGear (equipment, amount) {
		return new Procedure.Effect.UseUpGear(equipment, amount)
	}

	static changeStat (stat, change) {
		return new Procedure.Effect.ChangeStat(stat, change)
	}

	static resolveBond () {
		return new Procedure.Effect.ResolveBond()
	}

	static createBond () {
		return new Procedure.Effect.CreateBond()
	}

	static addAdvancedMove () {
		return new Procedure.Effect.AddAdvancedMove()
	}

	static multiclass (classRestrictions, levelRestrictions) {
		return new Procedure.Effect.Multiclass(classRestrictions, levelRestrictions)
	}

	static activateClassLevelUpEffects () {
		return new Procedure.Effect.ActivateClassLevelUpEffects()
	}

	static modifier (modifier, options) {
		return new Procedure.Effect.Modifier(modifier, options)
	}

	static hold (count, usageOptions) {
		return new Procedure.Effect.Hold(count, usageOptions)
	}

	static multipleEffects (effects...) {
		return new Procedure.Effect.Multiple(effects)
	}
}

Procedure.Effect = class Effect extends Procedure.Effect { }

Procedure.Effect.BasicEffect = class BasicEffect extends Procedure.Effect {
	constructor (text) {
		Object.assign(this, { text })
	}
}

function effectize (something) {
	if (something === undefined || something instanceof Procedure.Effect) {
		return something
	} else {
		return new Procedure.Effect.BasicEffect(something)
	}
}

Procedure.Roll = class Roll {
	constructor (formula, { success, partialSuccess, miss }) {
		Object.assign(this, { formula, effectize(success), effectize(partialSuccess), effectize(miss) })
	}	
}

Procedure.Choice = class Choice extends Procedure.Effect {
	constructor (text, options, count = 1) {
		Object.keys(options).forEach(key => { options[key] = effectize(options[key]) })
		Object.assign(this, { text, options, count })
	}
}

Procedure.Effect.NoEffect = class NoEffect extends Procedure.Effect { }

Procedure.Effect.DoDamage = class DoDamage extends Procedure.Effect {
	constructor (damageFormula) { // damageFormula can be undefined, when the default damage should be used.
		Object.assign(this, { damageFormula })
	}
}

Procedure.Effect.TakeDamage = class TakeDamage extends Procedure.Effect { }

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

Procedure.Effect.CreateBond = class CreateBond extends Procedure.Effect { }
Procedure.Effect.ResolveBond = class ResolveBond extends Procedure.Effect { }
Procedure.Effect.AddAdvancedMove = class AddAdvancedMove extends Procedure.Effect { }
Procedure.Effect.ActivateClassLevelUpEffects = class ActivateClassLevelUpEffects extends Procedure.Effect { }

Procedure.Effect.Multiclass = class Multiclass extends Procedure.Effect {
	constructor (classRestrictions, levelRestrictions) {
		Obejct.assign(this, { classRestrictions, levelRestrictions })
	}
}

Procedure.Effect.Modifier = class Modifier extends Procedure.Effect {
	constructor (modifier, options) {
		Object.assign(this, { modifier }, options)
	}
}

Procedure.Effect.Hold class Hold extends Procedure.Effect {
	constructor (count, usageOptions) {
		Object.keys(usageOptions).forEach(key => { usageOptions[key] = effectize(usageOptions[key]) })
		Object.assign(this, { count, usageOptions })
	}
}

Procedure.Effect.Multiple = class Multiple extends Procedure.Effect {
	constructor (effects) {
		Object.assign(this, { effects.map(effectize) })
	}
}

Procedure.Effect.Condition = class Condition extends Procedure.Effect {
	constructor (condition, onTrue, onFalse) {
		Obejct.assign(this, { condition, effectize(onTrue), effectize(onFalse) })
	}
}

Procedure.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.

Procedure.STATS = {
	HP: 'hp',
	XP: 'xp',
	LVL: 'level',
	ARMOR: 'armor',
	MAX_HP: 'maxHP',
	DAMAGE: 'damage'
	
	STRENGTH: 'Strength',
	DEXTERITY: 'Dexterity',
	CONSITUTION: 'Constitution',
	INTELLIGENCE: 'Intelligence',
	WISDOM: 'Wisdom',
	CHRASIMA: 'Charisma',

	STR: 'STR',
	DEX: 'DEX',
	CON: 'CON',
	INT: 'INT',
	WIS: 'WIS',
	CHA: 'CHA',

	WEAK: 'Weak',
	SHAKEY: 'Shakey',
	SICK: 'Sick',
	STUNNED: 'Stunned',
	CONFUSED: 'Confused',
	SCARRED: 'Scarred'
}

export default Procedure
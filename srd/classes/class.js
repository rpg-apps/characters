class Class {
	constructor ({ optionalNames, optionalLook, maxHP, baseDamage, load, alignmentOptions, raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10, startingGear, bondOptions, moveChoices }) {
		Object.assign(this, { optionalNames, optionalLook, maxHP, baseDamage, load, alignmentOptions, raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10, startingGear, bondOptions, moveChoices })
	}
}

Class.BondOption = class BondOption {
	constructor (template) {
		this.template = template
	}

	getBond (characterName) {
		return this.template.replaceAll('%s', characterName)
	}
}

Class.AlignmentOpion = class AlignmentOpion {
	constructor (alignment, goal) {
		this.alignment = alignment
		this.goal = goal
	}
}

Class.MoveChoice = class MoveChoice {
	constructor(move, text, options) {
		this.move = move
		this.text = text
		this.options = options
	}
}

Class.GearChoice = class GearChoice {
	constructor (text, options, amount) {
		this.text = text
		this.options = options
		this.amount = amount
	}
}

export default Class
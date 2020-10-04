class Class {
	constructor ({
		optionalNames,
		optionalLook,
		maxHP,
		baseDamage,
		load,
		alignmentOptions,
		raceMoves,
		startingMoves,
		advancedMoves2_5,
		advancedMoves6_10,
		startingGear,
		bondOptions,
		classBuildingChoices })
	{
		Object.assign(this, {
			optionalNames,
			optionalLook,
			maxHP,
			baseDamage,
			load,
			alignmentOptions,
			raceMoves,
			startingMoves,
			advancedMoves2_5,
			advancedMoves6_10,
			startingGear,
			bondOptions,
			classBuildingChoices
		})
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

Class.Alignment = class Alignment {
	constructor (alignment, goal) {
		this.alignment = alignment
		this.goal = goal
	}
}

Class.BuildingChoice = class BuildingChoice {
	constructor(text, options) {
		this.text = text
		this.options = options
		this.amount = amount
	}
}

export default Class
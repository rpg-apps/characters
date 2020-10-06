class PLaybook {
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
		characterBuildingChoices })
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
			characterBuildingChoices
		})
	}
}

PLaybook.BondOption = class BondOption {
	constructor (template) {
		this.template = template
	}

	getBond (characterName) {
		return this.template.replaceAll('%s', characterName)
	}
}

PLaybook.Alignment = class Alignment {
	constructor (alignment, goal) {
		this.alignment = alignment
		this.goal = goal
	}
}

PLaybook.BuildingChoice = class BuildingChoice {
	constructor(text, options) {
		this.text = text
		this.options = options
		this.amount = amount
	}
}

export default PLaybook
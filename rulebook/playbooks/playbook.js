class Playbook {
	constructor ({
		optionalNames,
		optionalTitles,
		optionalLook,
		maxHP,
		baseDamage,
		load,
		alignmentOptions,
		raceMoves,
		startingMoves,
		advancedMoves2_5,
		advancedMoves6_10,
		startingEquipment,
		bondOptions,
		characterBuildingChoices
	}) {
		Object.assign(this, {
			optionalNames,
			optionalTitles,
			optionalLook,
			maxHP,
			baseDamage,
			load,
			alignmentOptions,
			raceMoves,
			startingMoves,
			advancedMoves2_5,
			advancedMoves6_10,
			startingEquipment,
			bondOptions,
			characterBuildingChoices
		})
	}
}

Playbook.Alignment = class Alignment {
	constructor (alignment, goal) {
		Object.assign(this, { alignment, goal })
	}
}

Playbook.BondOption = class BondOption {
	constructor (template) {
		Object.assign(this, { template })
	}
}

Playbook.Gear = class Gear {
	constructor (equipment, count = 1) {
		Object.assign(this, { equipment, count })
	}
}

export default Playbook
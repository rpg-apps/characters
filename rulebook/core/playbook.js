/* TODO
 * Special effects in plabyooks, triggered by moves, such as "level up"
*/ 

export default class Playbook {
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

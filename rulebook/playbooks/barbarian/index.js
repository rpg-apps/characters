import Playbook, { BuildingChoice } from './playbook'
import Equipment from '../../eqipment'

import Gear from '../../mechanics/gear'
import Bond from '../../mechanics/bonds'
import Alignment from '../../mechanics/alignment'

import raceMoves from './race_moves/**'
import startingMoves from './starting_moves/**'
import advancedMoves2_5 from './advanced_moves_2_5/**'
import advancedMoves6_10 from './advanced_moves_6_10/**'

const barbarian = new Playbook({
	optionalNames: {
		outsider: ['Gorm', 'Si-Yi', 'Priscilla', 'Sen', 'Xia', 'Anneira', 'Haepha', 'Lur', 'Shar', 'Korrin', 'Nkosi', 'Fafnir', 'Qua', 'Sacer', 'Vercin’geto', 'Barbozar', 'Clovis', 'Frael', 'Thra raxes', 'Sillius', 'Sha Sheena', 'Khamisi']
	},
	optionalTitles: ['the Glorious', 'the Hungry', 'the Irascible', 'the Undefeated', 'the Gluttonous', 'Foesmasher', 'Bonebreaker', 'the Mirthful', 'the Melancholic', 'All Mighty', 'the Giant', 'the Triumphant'],
	
	optionalLook: {
		eyes: ['Tormented eyes', 'Haunted eyes', 'Wild eyes', 'Shrouded eyes'],
		build: ['Mighty thews', 'Long shanks', 'Scrawny body', 'Supple body'],
		decoration: ['Strange tattoos', 'Unusual jewelry', 'Unmarred by decoration'],
		clothes: ['Scraps', 'Silks', 'Scavenger’s outfit', 'Weather inappropriate clothes']
	},
	maxHP: 'Constitution+8',
	baseDamage: 'd10',
	load: 'Str+8',
	alignmentOptions: [
		new Alignment('chaotic', 'You eschew a convention of the civilized world.'),
		new Alignment('neutral', 'Teach someone the ways of your people.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
		new Gear(Equipment.DUNGEON_RATIONS, 5),
		new Gear(Equipment.DAGGER),
		new Gear(new Equipment('Some token of where you’ve traveled or where you’re from')),
		new BuildingChoice('Choose of magic', [
			new Gear(Equipment.AXE),
			new Gear(Equipment.TWO_HANDED_SWORD)
		]),
		new BuildingChoice('Choose one', [
			[new Gear(Equipment.ADVENTURING_GEAR, 5), new Gear(Equipment.DUNGEON_RATIONS, 5)],
			new Gear(Equipment.CHAINMAIL)
		])
	],
	bondOptions: [
		new Bond.Option('<char> is puny and foolish, but amusing to me.'),
		new Bond.Option('<char>’s ways are strange and confusing.'),
		new Bond.Option('<char> is always getting into trouble — I must protect them from themselves.'),
		new Bond.Option('<char> shares my hunger for glory; the earth will tremble at our passing!')
	],
	characterBuildingChoices: [
	]
})

export default barbarian

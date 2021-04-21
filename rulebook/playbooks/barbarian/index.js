import Playbook, { BuildingChoice } from './playbook'

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
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	mechanics: { // Each mechanic gives its module, and is used if its enabled.
		alignment: Alignment => new BuildingChoice('Choose your alignment:', [
			new Alignment('chaotic', 'You eschew a convention of the civilized world.'),
			new Alignment('neutral', 'Teach someone the ways of your people.')
		]),
		equipment: Gear => [
			new Gear(Gear.Equipment.DUNGEON_RATIONS),
			new Gear(Gear.Equipment.DAGGER),
			new Gear(new Gear.Equipment('Some token of where you’ve traveled or where you’re from')),
			new BuildingChoice('Choose of magic', [
				new Gear(Gear.Equipment.AXE),
				new Gear(Gear.Equipment.TWO_HANDED_SWORD)
			]),
			new BuildingChoice('Choose one', [
				[new Gear(Gear.Equipment.ADVENTURING_GEAR), new Gear(Gear.Equipment.DUNGEON_RATIONS)],
				new Gear(Gear.Equipment.CHAINMAIL)
			])
		],
		bonds: Bond => [
			new Bond.Option('<char> is puny and foolish, but amusing to me.'),
			new Bond.Option('<char>’s ways are strange and confusing.'),
			new Bond.Option('<char> is always getting into trouble — I must protect them from themselves.'),
			new Bond.Option('<char> shares my hunger for glory; the earth will tremble at our passing!')
		]
	}
})

export default barbarian

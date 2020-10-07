import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/barbarian'

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
	maxHP: 'undefined',
	baseDamage: 'undefined',
	load: 'Str+8',
	alignmentOptions: [
		new Playbook.Alignment('chaotic', 'You eschew a convention of the civilized world.'),
		new Playbook.Alignment('neutral', 'Teach someone the ways of your people.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s is puny and foolish, but amusing to me.'),
		new Playbook.BondOption('%s’s ways are strange and confusing.'),
		new Playbook.BondOption('%s is always getting into trouble — I must protect them from themselves.'),
		new Playbook.BondOption('shares my hunger for glory; the earth will tremble at our passing!')
	],
	characterBuildingChoices: [
	]
})

export default barbarian

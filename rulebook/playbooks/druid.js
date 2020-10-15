import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/druid'

const druid = new Playbook({
	optionalNames: {
		elf: ['Hycorax', 'Ethanwe', 'Sinathel', 'Demanor', 'Menoliir', 'Mithralan', 'Taeros', 'Aegor'],
		halfling: ['Tanner', 'Dunstan', 'Rose', 'Ivy', 'Robard', 'Mab', 'Thistle', 'Puck', 'Anne', 'Serah'],
		human: ['Elana', 'Obelis', 'Herran', 'Syla', 'Andanna', 'Siobhan', 'Aziz', 'Pelin', 'Sibel', 'Nils', 'Wei']
	},
	
	optionalLook: {
		eyes: ['Wise Eyes', 'Wild Eyes', 'Haunting Eyes'],
		hair: ['Furry Hood', 'Messy Hair', 'Braided Hair'],
		clothes: ['Ceremonial Garb', 'Practical Leathers', 'Weathered Hides']
	},
	maxHP: 'Constitution+6',
	baseDamage: 'd6',
	load: 'Str+6',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Help something or someone grow.'),
		new Playbook.Alignment('chaotic', 'Destroy a symbol of civilization.'),
		new Playbook.Alignment('neutral', 'Eliminate an unnatural menace.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
		new Playbook.Gear(new Equipment('Some token of your land')),
		new Playbook.BuildingChoice('Choose your defenses', [
			new Playbook.Gear(Equipment.HIDE_ARMOER),
			new Playbook.Gear(Equipment.WOODEN_SHIELD)
		]),
		new Playbook.Gear('Choose your armament', [
			new Playbook.Gear(Equipment.SHILLELAGH),
			new Playbook.Gear(Equipment.STAFF),
			new Playbook.Gear(Equipment.SPEAR)
		]),
		new Playbook.Gear('Choose one', [
			new Playbook.Gear(Equipment.ADVENTURING_GEAR),
			new Playbook.Gear(Equipment.POULTICES_AND_HERBS, 2),
			new Playbook.Gear(Equipment.HALFLING_PIPELEAF),
			new Playbook.Gear(Equipment.ANTITOXIN, 3)
		])
	],
	bondOptions: [
		new Playbook.BondOption('%s smells more like prey than a hunter.'),
		new Playbook.BondOption('The spirits spoke to me of a great danger that follows %s'),
		new Playbook.BondOption('I have showed %s a secret rite of the Land.'),
		new Playbook.BondOption('%s has tasted my blood and I theirs. We are bound by it.')
	],
	characterBuildingChoices: [
	]
})

export default druid

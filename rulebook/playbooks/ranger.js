import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/ranger'

const ranger = new Playbook({
	optionalNames: {
		elf: ['Throndir', 'Elrosine', 'Aranwe', 'Celion', 'Dambrath', 'Lanethe'],
		human: ['Jonah', 'Halek', 'Brandon', 'Emory', 'Shrike', 'Nora', 'Diana']
	},
	
	optionalLook: {
		eyes: ['Wild Eyes', 'Sharp Eyes', 'or Animal Eyes'],
		hair: ['Hooded Head', 'Wild Hair', 'or Bald'],
		clothes: ['Cape', 'Camouflage', 'or Traveling Clothes'],
		build: ['Lithe Body', 'Wild Body', 'or Sharp Body']
	},
	maxHP: 'Constitution+8',
	baseDamage: 'd8',
	load: 'Str+11',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Endanger yourself to combat an unnatural threat.'),
		new Playbook.Alignment('chaotic', 'Free someone from literal or figurative bonds.'),
		new Playbook.Alignment('neutral', 'Help an animal or spirit of the wild.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('I have guided %s before and they owe me for it.'),
		new Playbook.BondOption('%s is a friend of nature, so I will be their friend as well.'),
		new Playbook.BondOption('%s has no respect for nature, so I have no respect for them.'),
		new Playbook.BondOption('%s does not understand life in the wild, so I will teach them.')
	],
	characterBuildingChoices: [
	]
})

export default ranger

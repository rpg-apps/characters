import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/paladin'

const paladin = new Playbook({
	optionalNames: {
		human: ['Thaddeus', 'Augustine', 'Lux', 'Cassius', 'Hadrian', 'Lucia', 'Octavia', 'Regulus', 'Valeria', 'Sanguinus', 'Titanius']
	},
	
	optionalLook: {
		symbol: ['Worn Holy Symbol or Fancy Holy Symbol'],
		eyes: ['Kind Eyes', 'Fiery Eyes', 'or Glowing Eyes'],
		hair: ['Helmet', 'Styled Hair', 'or Bald'],
		build: ['Fit Body', 'Bulky Body', 'or Thin Body']
	},
	maxHP: 'Constitution+10',
	baseDamage: 'd10',
	load: 'Str+12',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Endanger yourself to protect someone weaker than you.'),
		new Playbook.Alignment('lawful', 'Deny mercy to a criminal or unbeliever.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s\'s misguided behavior endangers their very soul!'),
		new Playbook.BondOption('%s has stood by me in battle and can be trusted completely.'),
		new Playbook.BondOption('I respect the beliefs of %s but hope they will someday see the true way.'),
		new Playbook.BondOption('%s is a brave soul, I have much to learn from them.')
	],
	characterBuildingChoices: [
	]
})

export default paladin

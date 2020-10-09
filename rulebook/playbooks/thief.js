import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/thief'

const thief = new Playbook({
	optionalNames: {
		halfling: ['Felix', 'Rook', 'Mouse', 'Sketch', 'Trixie', 'Robin', 'Omar', 'Brynn', 'Bug'],
		human: ['Sparrow', 'Shank', 'Jack', 'Marlow', 'Dodge', 'Rat', 'Pox', 'Humble', 'Farley']
	},
	
	optionalLook: {
		eyes: ['Shifty Eyes', 'or Criminal Eyes'],
		hair: ['Hooded Head', 'Messy Hair', 'or Cropped Hair'],
		clothes: ['Dark Clothes', 'Fancy Clothes', 'or Common Clothes'],
		build: ['Lithe Body', 'Knobby Body', 'or Flabby Body']
	},
	maxHP: 'Constitution+6',
	baseDamage: 'd8',
	load: 'Str+9',
	alignmentOptions: [
		new Playbook.Alignment('evil', 'Shift danger or blame from yourself to someone else.'),
		new Playbook.Alignment('chaotic', 'Leap into danger without a plan.'),
		new Playbook.Alignment('neutral', 'Avoid detection or infiltrate a location.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('I stole something from %s.'),
		new Playbook.BondOption('%s has my back when things go wrong.'),
		new Playbook.BondOption('%s knows incriminating details about me.'),
		new Playbook.BondOption('%s and I have a con running.')
	],
	characterBuildingChoices: [
	]
})

export default thief

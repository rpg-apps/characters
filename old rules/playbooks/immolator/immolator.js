import Playbook from './playbook'
import Equipment from '../equipment/gear'
import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/immolator'

const immolator = new Playbook({
	optionalNames: {
		human: ['Solomon', 'Timothy', 'Kalil', 'Omen', 'Yohn', 'Hiko', 'Agasha', 'Elizabeth', 'Harald', 'Fatia', 'Khalwa', 'Adur', 'Ignis', 'Yajna', 'Umlilo'],
		salamander: ['Sulfurheart', 'Flamewalker', 'Emberlash', 'Cinderclaw', 'Charfiend', 'Bittertallow', 'Barrowblaze', 'Singescale', 'Candlewick', 'Coalfang']
	},
	
	optionalLook: {
		attitude: ['Imperious bearing', 'manic attitude', 'barely-hidden rage'],
		eyes: ['Smoldering eyes', 'warm eyes', 'searing eyes'],
		skin: ['Strange brands', 'ritual scars', 'perfect skin'],
		voice: ['Crackling voice', 'whispering voice', 'roaring voice']
	},
	maxHP: 'Constitution+4',
	baseDamage: 'd8',
	load: 'Str+9',
	alignmentOptions: [
		new Playbook.Alignment('evil', 'Sacrifice an unwilling victim to the flames.'),
		new Playbook.Alignment('chaotic', 'Spread a dangerous new idea.'),
		new Playbook.Alignment('neutral', 'Exchange a sacrifice, freely given, for a service rendered.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s has felt the hellish touch of fire, now they know my strength.'),
		new Playbook.BondOption('I will teach %S the true meaning of sacrifice.'),
		new Playbook.BondOption('I cast something into the fire for %s and still owe them their due.')
	],
	characterBuildingChoices: [
	]
})

export default immolator

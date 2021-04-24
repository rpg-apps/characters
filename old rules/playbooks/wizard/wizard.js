import Playbook from './playbook'
import Equipment from '../equipment/gear'
import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/wizard'

const wizard = new Playbook({
	optionalNames: {
		elf: ['Galadiir', 'Fenfaril', 'Lilliastre', 'Phirosalle', 'Enkirash', 'Halwyr'],
		human: ['Avon', 'Morgan', 'Rath', 'Ysolde', 'Ovid', 'Vitus', 'Aldara', 'Xeno', 'Uri']
	},
	
	optionalLook: {
		eyes: ['Haunted Eyes', 'Sharp Eyes', 'or Crazy Eyes'],
		hair: ['Styled Hair', 'Wild Hair', 'or Pointed Hat'],
		clothes: ['Worn Robes', 'Stylish Robes', 'or Strange Robes'],
		build: ['Pudgy Body', 'Creepy Body', 'or Thin Body']
	},
	maxHP: 'Constitution+4',
	baseDamage: 'd4',
	load: 'Str+7',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Use magic to directly aid another.'),
		new Playbook.Alignment('evil', 'Use magic to cause terror and fear.'),
		new Playbook.Alignment('neutral', 'Discover something about a magical mystery.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s will play an important role in the events to come. I have foreseen it!'),
		new Playbook.BondOption('%s is keeping an important secret from me.'),
		new Playbook.BondOption('%s is woefully misinformed about the world; I will teach them all that I can.')
	],
	characterBuildingChoices: [
	]
})

export default wizard

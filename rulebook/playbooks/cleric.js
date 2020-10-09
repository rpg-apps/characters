import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/cleric'

const cleric = new Playbook({
	optionalNames: {
		dwarf: ['Durga', 'Aelfar', 'Gerda', 'Rurgosh', 'Bjorn', 'Drummond', 'Helga', 'Siggrun', 'Freya'],
		human: ['Wesley', 'Brinton', 'Jon', 'Sara', 'Hawthorn', 'Elise', 'Clarke', 'Lenore', 'Piotr', 'Dahlia', 'Carmine']
	},
	
	optionalLook: {
		eyes: ['Kind Eyes', 'Sharp Eyes', 'Sad Eyes'],
		hair: ['Tonsure', 'Strange Hair', 'Bald'],
		clothes: ['Flowing Robes', 'Habit', 'Common Garb'],
		build: ['Thin Body', 'Knobby Body', 'Flabby Body']
	},
	maxHP: 'Constitution+8',
	baseDamage: '6d',
	load: 'Str+10',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Endanger yourself to heal another.'),
		new Playbook.Alignment('evil', 'Harm another to prove the superiority of your church or god.'),
		new Playbook.Alignment('lawful', 'Endanger yourself following the precepts of your church or god.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s has insulted my deity; I do not trust them.'),
		new Playbook.BondOption('%s is a good and faithful person; I trust them implicitly.'),
		new Playbook.BondOption('%s is in constant danger, I will keep them safe.'),
		new Playbook.BondOption('I am working on converting %s to my faith.')
	],
	characterBuildingChoices: [
	]
})

export default cleric

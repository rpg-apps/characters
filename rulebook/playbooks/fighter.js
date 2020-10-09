import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/fighter'

const fighter = new Playbook({
	optionalNames: {
		dwarf: ['Ozruk', 'Surtur', 'Brunhilda', 'Annika', 'Janos', 'Greta', 'Dim', 'Rundrig', 'Jarl', 'Xotoq'],
		elf: ['Elohiir', 'Sharaseth', 'Hasrith', 'Shevaral', 'Cadeus', 'Eldar', 'Kithracet', 'Thelian'],
		halfling: ['Finnegan', 'Olive', 'Randolph', 'Bartleby', 'Aubrey', 'Baldwin', 'Becca'],
		human: ['Hawke', 'Rudiger', 'Gregor', 'Brianne', 'Walton', 'Castor', 'Shanna', 'Ajax', 'Hob']
	},
	
	optionalLook: {
		skin: ['Calloused Skin', 'Tanned Skin', 'Scarred Skin'],
		eyes: ['Hard Eyes', 'Dead Eyes', 'or Eager Eyes'],
		hair: ['Wild Hair', 'Shorn Hair', 'or Battered Helm'],
		build: ['Built Body', 'Lithe Body', 'or Ravaged Body']
	},
	maxHP: 'Constitution+10',
	baseDamage: 'd10',
	load: 'Str+12',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Defend those weaker than you.'),
		new Playbook.Alignment('evil', 'Kill a defenseless or surrendered enemy.'),
		new Playbook.Alignment('neutral', 'Defeat a worthy opponent.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
	],
	bondOptions: [
		new Playbook.BondOption('%s owes me their life, whether they admit it or not.'),
		new Playbook.BondOption('I have sworn to protect %s'),
		new Playbook.BondOption('I worry about the ability of %s to survive in the dungeon.'),
		new Playbook.BondOption('%s is soft, but I will make them hard like me.')
	],
	characterBuildingChoices: [
	]
})

export default fighter

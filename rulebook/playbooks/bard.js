import Playbook from './playbook'

import Equipment from '../equipment/gear'

import { raceMoves, startingMoves, advancedMoves2_5, advancedMoves6_10 } from '../moves/playbook_moves/bard'

const bard = new Playbook({
	optionalNames: {
		elf: ['Astrafel', 'Daelwyn', 'Feliana', 'Damarra', 'Sistranalle', 'Pendrell', 'Melliandre', 'Dagoliir'],
		human: ['Baldric', 'Leena', 'Dunwick', 'Willem', 'Edwyn', 'Florian', 'Seraphine', 'Quorra', 'Charlotte', 'Lily', 'Ramonde', 'Cassandra']
	},
	optionalLook: {
		eyes: ['Knowing Eyes', 'Fiery Eyes', 'Joyous Eyes'],
		hair: ['Fancy Hair', 'Wild Hair', 'Stylish Cap'],
		clothes: ['Finery', 'Traveling Clothes', 'Poor Clothes'],
		body: ['Fit Body', 'Well-fed Body', 'Thin Body']
	},
	maxHP: 'Constitution+6',
	baseDamage: 'd6',
	load: 'Str+9',
	alignmentOptions: [
		new Playbook.Alignment('good', 'Perform your art to aid someone else.'),
		new Playbook.Alignment('neutral', 'Avoid a conflict or defuse a tense situation.'),
		new Playbook.Alignment('chaotic', 'Spur others to significant and unplanned decisive action.')
	],
	raceMoves,
	startingMoves,
	advancedMoves2_5,
	advancedMoves6_10,
	startingEquipment: [
		new Playbook.Gear(Equipment.DUNGEON_RATIONS, 5),
		new Playbook.BuildingChoice('Choose an instrument (all are 0 weight)', [
			new Playbook.Gear('Your father’s mandolin, repaired'),
			new Playbook.Gear('A fine lute, a gift from a noble'),
			new Playbook.Gear('The pipes with which you courted your first love'),
			new Playbook.Gear('A stolen horn'),
			new Playbook.Gear('A fiddle, never before played'),
			new Playbook.Gear('A songbook in a forgotten tongue')
		]),
		new Playbook.BuildingChoice('Choose your clothing', [
			new Playbook.Gear(Equipment.LEATHER_ARMOER),
			new Playbook.Gear('Ostentatious clothes')
		]),
		new Playbook.BuildingChoice('Choose your armament', [
			new Playbook.Gear(Equipment.DUELING_RAPIER),
			[new Playbook.Gear(Equipment.WORN_BOW), new Playbook.Gear(Equipment.BUNDLE_OF_ARROWS), new Playbook.Gear(Equipment.SHORT_SWORD)]
		]),
		new Playbook.BuildingChoice('Choose one', [
			new Playbook.Gear(Equipment.ADVENTURING_GEAR),
			new Playbook.Gear(Equipment.BANDAGES),
			new Playbook.Gear(Equipment.HALFLING_PIPELEAF),
			new Playbook.Gear(Equipment.COIN, 3)
		])
	],
	bondOptions: [
		new Playbook.BondOption('This is not my first adventure with %s.'),
		new Playbook.BondOption('I sang stories of %s long before I ever met them in person.'),
		new Playbook.BondOption('%s is often the butt of my jokes.'),
		new Playbook.BondOption('I am writing a ballad about the adventures of %s'),
		new Playbook.BondOption('%s trusted me with a secret.'),
		new Playbook.BondOption('%s does not trust me, and for good reason.')
	],
	characterBuildingChoices: [
		new Playbook.BuildingChoice('Choose an area of expertise:', [
				'Spells and Magicks',
				'The Dead and Undead',
				'Grand Histories of the Known World',
				'A Bestiary of Creatures Unusual',
				'The Planar Spheres',
				'Legends of Heroes Past',
				'Gods and Their Servants'
			], 
	]
})

export default bard

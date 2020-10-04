import Class from './class'

import Equipment from '../equipment/gear'

const bard = new Class({
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
		new Class.Alignment('good', 'Perform your art to aid someone else.'),
		new Class.Alignment('neutral', 'Avoid a conflict or defuse a tense situation.'),
		new Class.Alignment('chaotic', 'Spur others to significant and unplanned decisive action.')
	],
	raceMoves: {
		elf: ,
		huma: 
	},
	startingMoves: {
	},
	advancedMoves2_5: {

	},
	advancedMoves6_10: [],
	startingEquipment: [
		new Gear(Equipment.DUNGEON_RATIONS, 5),
		new Class.BuildingChoice('Choose an instrument (all are 0 weight)', [
			new Gear('Your father’s mandolin, repaired'),
			new Gear('A fine lute, a gift from a noble'),
			new Gear('The pipes with which you courted your first love'),
			new Gear('A stolen horn'),
			new Gear('A fiddle, never before played'),
			new Gear('A songbook in a forgotten tongue')
		]),
		new Class.BuildingChoice('Choose your clothing', [
			new Gear(Equipment.LEATHER_ARMOER),
			new Gear('Ostentatious clothes')
		]),
		new Class.BuildingChoice('Choose your armament', [
			new Gear(Equipment.DUELING_RAPIER),
			[new Gear(Equipment.WORN_BOW), new Gear(Equipment.BUNDLE_OF_ARROWS), new Gear(Equipment.SHORT_SWORD)]
		]),
		new Class.BuildingChoice('Choose one', [
			new Gear(Equipment.ADVENTURING_GEAR),
			new Gear(Equipment.BANDAGES),
			new Gear(Equipment.HALFLING_PIPELEAF),
			new Gear(Equipment.COIN, 3)
		])
	],
	bondOptions: [
		new Class.BondOption('This is not my first adventure with %s.'),
		new Class.BondOption('I sang stories of %s long before I ever met them in person.'),
		new Class.BondOption('%s is often the butt of my jokes.'),
		new Class.BondOption('I am writing a ballad about the adventures of %s'),
		new Class.BondOption('%s trusted me with a secret.'),
		new Class.BondOption('%s does not trust me, and for good reason.')
	],
	classBuildingChoices: [
		new Class.BuildingChoice('Choose an area of expertise:', [
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

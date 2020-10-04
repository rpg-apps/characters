import Class from './class'

import Move from '../moves/move'
import Equipment from '../equipment/gear'

const arcanceArtChoice = new Move.Triggered.Choice('choose an ally and an effect', [
	new Move.Triggered.Node.Roll('1d8', roll => new Move.Triggered.Node.Result(`Heal ${roll} damage.`)),
	new Move.Triggered.Node.Result('+1d4 forward to damage.')
	new Move.Triggered.Node.Result('Their mind is shaken clear of one enchantment'),
	new Move.Triggered.Node.Result('The next time someone successfully assists the target with aid, they get +2 instead of +1'),
])

const bardicLore = new Move.Triggered('When you first encounter an important creature, location, or item (your call) covered by your bardic lore', new Move.Triggered.Node.Result('you can ask the GM any one question about it; the GM will answer truthfully. The GM may then ask you what tale, song, or legend you heard that information in.'))

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
		new Class.AlignmentOption('good', 'Perform your art to aid someone else.'),
		new Class.AlignmentOption('neutral', 'Avoid a conflict or defuse a tense situation.'),
		new Class.AlignmentOption('chaotic', 'Spur others to significant and unplanned decisive action.')
	],
	raceMoves: {
		elf: new Move.Triggered('When you enter an important location (your call)', new Move.Triggered.Node.Result('you can ask the GM for one fact from the history of that location.')),
		huma: new Move.Triggered('When you first enter a civilized settlement', new Move.Triggered.Node.Result('someone who respects the custom of hospitality to minstrels will take you in as their guest.'))
	},
	startingMoves: {
		'arcane art': new Move.Triggered('When you weave a performance into a basic spell', new Move.Triggered.Node.Roll.Classic('roll+Cha',
			arcanceArtChoice,
			new Move.Triggered.Node.And(
				arcanceArtChoice,
				new Move.Triggered.Node.Result('you draw unwanted attention or your magic reverberates to other targets affecting them as well, GM’s choice.')))),
		
		'bardic lore': bardicLore,
		
		'charming and open': new Move.Triggered('When you speak frankly with someone', new Move.Triggered.Node.Choice('you can ask their player a question from the list below. They must answer it truthfully, then they may ask you a question from the list (which you must answer truthfully).', [
				Move.Triggered.Node.Result('Whom do you serve?'),
				Move.Triggered.Node.Result('What do you wish I would do?'),
				Move.Triggered.Node.Result('How can I get you to ______?'),
				Move.Triggered.Node.Result('What are you really felling right now?'),
				Move.Triggered.Node.Result('What do you most desire?')
			]),
		'a port in the storm': new Move.Triggered('When you return to a civilized settlement you’ve visited before', new Move.Triggered.Node.Result('tell the GM when you were last here. They’ll tell you how it’s changed since then.'))
	},
	advancedMoves2_5: {
		'healing song': new Move.Static('When you heal with arcane art, you heal +1d8 damage.', [new Move.Modifier([arcanceArtChoice.options[0]], '+1d8')]),
		
		'vicious cachophony': new Move.Static('When you grant bonus damage with arcane art, you grant an extra +1d4 damage.', [new Move.Modifier([ arcanceArtChoice.options[1]], '+2d4 forward to damage.')]),
		
		'it goes to eleven': new Move.Triggered('When you unleash a crazed performance (a righteous lute solo or mighty brass blast, maybe)', 
			new Move.Triggered.Node.And(
				new Move.Triggered.Node.Result('choose a target who can hear you'),
				new Move.Triggered.Node.Roll.Classes('roll+Cha',
					new Move.Triggered.Node.Result('the target attacks their nearest ally in range.'),
					new Move.Triggered.Node.Result('they attack their nearest ally, but you also draw their attention and ire.')))),
		
		'metal hurlant': new Move.Triggered('When you shout with great force or play a shattering note',
			new Move.Triggered.Node.And(
				new Move.Triggered.Node.Result('choose a target'),
				new Move.Triggered.Node.Roll.Classes('roll+Con',
					new Move.Triggered.Node.Roll('1d10', roll => new Move.Triggered.Node.Result(`the target takes ${roll} damage and is deafened for a few minutes.`)),
					new Move.Triggered.Node.And(
						new Move.Triggered.Node.Roll('1d10', roll => new Move.Triggered.Node.Result(`the target takes ${roll} damage and is deafened for a few minutes.`)),
						new Move.Triggered.Node.Result('it’s out of control: the GM will choose an additional target nearby.')))))
	},
	advancedMoves6_10: [],
	startingEquipment: [
		new Gear(Equipment.DUNGEON_RATIONS, 5)
		new Class.GearChoice('Choose an instrument (all are 0 weight)', [
			new Gear('Your father’s mandolin, repaired'),
			new Gear('A fine lute, a gift from a noble'),
			new Gear('The pipes with which you courted your first love'),
			new Gear('A stolen horn'),
			new Gear('A fiddle, never before played'),
			new Gear('A songbook in a forgotten tongue')
		]),
		new Class.GearChoice('Choose your clothing', [
			new Gear(Equipment.LEATHER_ARMOER),
			new Gear('Ostentatious clothes')
		]),
		new Class.GearChoice('Choose your armament', [
			new Gear(Equipment.DUELING_RAPIER),
			[new Gear(Equipment.WORN_BOW), new Gear(Equipment.BUNDLE_OF_ARROWS), new Gear(Equipment.SHORT_SWORD)]
		]),
		new Class.GearChoice('Choose one', [
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
	moveChoices: [
		new Class.MoveChoice(bardicLore, 'Choose an area of expertise:', [
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

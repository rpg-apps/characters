import Move, { Procedure } from '../../../move'

const { roll, choice, changeStat, multipleEffects, STATS } = Procedure

const success = choice('Choose an effect', {
	'Heal 1d8 damage':  choice('Are you the affected ally?', { 'Yes': changeStat(STATS.HP, '+1d8'), 'No': roll('1d8') }),
	'+1d4 forward to damage': choice('Are you the affected ally?', { 'Yes': modifier('+1d4', { on: 'damage', usages: 1 }), 'No': roll('1d8') }),
	'Their mind is shaken clear of one enchantment',
	'The next time someone successfully assists the target with aid, they get +2 instead of +1'
})

const arcaneArt = new Move({
	title: 'Arcane Art',
	text: 
`When you weave a performance into a basic spell, choose an ally and an effect:
* Heal 1d8 damage
* +1d4 forward to damage
* Their mind is shaken clear of one enchantment
* The next time someone successfully assists the target with aid, they get +2 instead of +1

Then roll+CHA.
* On a 10+, the ally gets the selected effect.
* On a 7-9, your spell still works, but you draw unwanted attention or your magic reverberates to other targets affecting them as well, GM’s choice.`,

	procedure: new Procedure('When you weave a performance into a basic spell', roll('roll+Cha', {
		success,
		partialSuccess: multipleEffects(success, 'You draw unwanted attention or your magic reverberates to other targets affecting them as well, GM’s choice.')
	}))
})

export default arcaneArt
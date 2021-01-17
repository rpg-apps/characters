import Move from '../move'
import Procedure, { roll, choice, useGear, modifier, simultaneous } from '../move_procedure'

const options = {
	'You befriend a useful NPC.',
	'You hear rumors of an opportunity.',
	'You gain useful information.',
	'You are not entangled, ensorcelled, or tricked'
}

const carouse = new Move({
	title: 'Carouse',
	text: 
`When you return triumphant and throw a big party, spend 100 coins and roll +1 for every extra 100 coins spent.
* On a 10+, choose 3.
* On a 7–9, choose 1.
* On a miss, you still choose one, but things get really out of hand (the GM will say how).

* You befriend a useful NPC.
* You hear rumors of an opportunity.
* You gain useful information.
* You are not entangled, ensorcelled, or tricked.`,

	procedure: new Procedure('When you return triumphant and throw a big party', simultaneous(
		choice({
			'Spend 100 coins and roll with +0': useGear(Equipment.COIN, 100),
			'Spend 200 coins and roll with +1': simultaneous(modifier('+1', { usages: 1, forced: true }), useGear(Equipment.COIN, 200)),
			'Spend 300 coins and roll with +2': simultaneous(modifier('+2', { usages: 1, forced: true }), useGear(Equipment.COIN, 300)),
			'Spend 400 coins and roll with +3': simultaneous(modifier('+3', { usages: 1, forced: true }), useGear(Equipment.COIN, 400)),
		})),
		roll('roll', {
			success: choice('Choose 3', options, 3),
			partialSuccess: choice('Choose 1', options),
			miss: simultaneous(choice('Choose 1', options), 'things get really out of hand (the GM will say how)')
		})
	)
})

export default carouse
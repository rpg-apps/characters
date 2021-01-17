import Move from '../move'
import Procedure, { roll, modifier, multipleEffect } from '../move_procedure'

const takeWatch = new Move({
	title: 'Take Watch',
	text: 
`When you’re on watch and something approaches the camp roll+Wis.
* On a 10+, you’re able to wake the camp and prepare a response, everyone in the camp takes +1 forward.
* On a 7–9, you react just a moment too late; your companions in camp are awake but haven’t had time to prepare. They have weapons and armor but little else.
* On a miss, whatever lurks outside the campfire’s light has the drop on you.`,

	procedure: new Procedure('When you’re on watch and something approaches the camp', roll('roll+Wis', {
		success: multipleEffect('You’re able to wake the camp and prepare a response', modifier('+1', { usages: 1 })),
		partialSuccess: 'You react just a moment too late; your companions in camp are awake but haven’t had time to prepare. They have weapons and armor but little else.',
		miss: 'Whatever lurks outside the campfire’s light has the drop on you.'
	}))
})

export default takeWatch

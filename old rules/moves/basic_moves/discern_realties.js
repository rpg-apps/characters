import Move from '../move'
import Procedure, { roll, choice, modifier, series } from '../move_procedure'

const questions = {
	'What happened here recently?',
	'What is about to happen?',
	'What should I be on the lookout for?',
	'What here is useful or valuable to me?',
	'Who’s really in control here?',
	'What here is not what it appears to be?',
}

const discernRealities = new Move({
	title: 'Discern Realities',
	text: 
`When you closely study a situation or person, roll+Wis.
* On a 10+, ask the GM 3 questions from the list below.
* On a 7–9, ask 1.

Either way, take +1 forward when acting on the answers.
* What happened here recently?
* What is about to happen?
* What should I be on the lookout for?
* What here is useful or valuable to me?
* Who’s really in control here?
* What here is not what it appears to be?`,

	procedure: new Procedure('When you closely study a situation or person', roll('roll+Wis', {
		success: series(
			choice('Ask the GM 3 questions from the list below.', questions, 3),
			modifier('+1', { on: 'when acting on the answers', usages: 1 })),
		partialSuccess: series(
			choice('Ask the GM 1 questions from the list below.', questions, 1),
			modifier('+1', { on: 'when acting on the answers', usages: 1 })),
	}))
})

export default discernRealities
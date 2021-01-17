import Move, { Procedure } from '../../../move'

import Procedure, { choice, simultaneous } from '../../../move_procedure'

const questions = {
	'Whom do you serve?',
	'What do you wish I would do?',
	'How can I get you to _____?',
	'What are you really feeling right now?',
	'What do you most desire?'
}

const charmingAndOpen = new Move({
	title: 'Chraming & Open',
	text: 
`When you speak frankly with someone, you can ask their player a question from the list below. They must answer it truthfully, then they may ask you a question from the list (which you must answer truthfully).
* Whom do you serve?
* What do you wish I would do?
* How can I get you to _____?
* What are you really feeling right now?
* What do you most desire?`,

	procedure: new Procedure('When you speak frankly with someone', simultaneous(
			choice('Choose a question for you to ask them', questions),
			choice('Choose a question for you to ask them', questions)
		))
})

export default charmingAndOpen
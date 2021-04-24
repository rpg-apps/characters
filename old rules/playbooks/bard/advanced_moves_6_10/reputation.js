import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const reputation = new Move({
	title: 'Reputation',
	text: 
`When you first meet someone who’s heard songs about you, roll+Cha.
* On a 10+, tell the GM two things they’ve heard about you.
* On a 7-9, tell the GM one thing they’ve heard, and the GM tells you one thing.`,

	procedure: new Procedure('When you first meet someone who’s heard songs about you', roll('roll+Cha', {
		success: 'Tell the GM two things they’ve heard about you.',
		partialSuccess: 'Tell the GM one thing they’ve heard, and the GM tells you one thing.'
	}))
})

export default reputation
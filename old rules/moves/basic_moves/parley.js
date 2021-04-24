import Move from '../move'
import Procedure, { roll } from '../move_procedure'

const parley = new Move({
	title: 'Parley',
	text: 
`When you have leverage on a GM Character and manipulate them, roll+Cha.
Leverage is something they need or want.
* On a 10+, they do what you ask if you first promise what they ask of you.
* On a 7–9, they will do what you ask, but need some concrete assurance of your promise, right now.`,

	procedure: new Procedure('When you have leverage on a GM Character and manipulate them', roll('roll+Cha', {
		success: 'They do what you ask if you first promise what they ask of you.',
		partialSuccess: 'They will do what you ask, but need some concrete assurance of your promise, right now.'
	}))
})

export default parley
import Move from '../../../move'
import Procedure, { roll, choice, simultaneous } from '../../../move_procedure'

const tricksOfTheTrade = new Move({
	title: 'Tricks Of The Trade',
	text: 
`When you pick locks or pockets or disable traps`,

	procedure: new Procedure('When you pick locks or pockets or disable traps', roll('roll+Dex', {
		success: 'You do it, no problem.',
		partialSuccess: 'You still do it, but the GM will offer you two options between suspicion, danger, or cost.',
		miss: ''
	}))
})

export default tricksOfTheTrade
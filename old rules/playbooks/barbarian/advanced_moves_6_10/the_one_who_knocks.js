import Move from '../../../move'
import Procedure, { condition, CONSTANT } from '../../../move_procedure'

const theOneWhoKnocks = new Move({
	title: 'The One Who Knocks',
	text: 
`When you defy danger, on a 12+ you turn the danger back on itself, the GM will describe how.`,

	procedure: new Procedure(CONSTANT, )
})

export default theOneWhoKnocks
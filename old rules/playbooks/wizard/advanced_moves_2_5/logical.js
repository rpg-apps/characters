import Move from '../../../move'
import Procedure, { modifier } from '../../../move_procedure'

const logical = new Move({
	title: 'Logical',
	text: 
`When you use strict deduction to analyze your surroundings, you can discern realities with INT instead of WIS.`,

	procedure: new Procedure('When you use strict deduction to analyze your surroundings', )
})

export default logical
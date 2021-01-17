import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const caution = new Move({
	title: 'Caution',
	text: 
`When you use trap expert you always get +1 hold, even on a 6-.`,

	procedure: new Procedure(CONSTANT, )
})

export default caution
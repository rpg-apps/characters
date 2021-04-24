import Move from '../../../move'
import Procedure, { CONSTANT } from '../../../move_procedure'

const wildEmpathy = new Move({
	title: 'Wild Empathy',
	text: 
`You can speak with and understand animals.`,

	procedure: new Procedure(CONSTANT, You can speak with and understand animals.)
})

export default wildEmpathy
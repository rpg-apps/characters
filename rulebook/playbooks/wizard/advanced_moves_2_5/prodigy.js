import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const prodigy = new Move({
	title: 'Prodigy',
	text: 
`Choose a spell. You prepare that spell as if it were one level lower.`,

	procedure: new Procedure(CONSTANT, )
})

export default prodigy
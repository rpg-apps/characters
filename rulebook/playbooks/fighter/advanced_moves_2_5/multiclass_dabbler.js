import Move from '../../../move'
import Procedure, { multiclass } from '../../../move_procedure'

const multiclassDabbler = new Move({
	title: 'Multiclass Dabbler',
	text: 
`Get one move from another class. Treat your level as one lower for choosing the move.`,

	procedure: new Procedure('', multiclass())
})

export default multiclassDabbler
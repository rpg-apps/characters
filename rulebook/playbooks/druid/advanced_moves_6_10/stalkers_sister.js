import Move from '../../../move'
import Procedure, { multiclass } from '../../../move_procedure'

const stalkersSister = new Move({
	title: 'Stalkers Sister',
	text: 
`Choose one move from the ranger class list.`,

	procedure: new Procedure('', multiclass())
})

export default stalkersSister
import Move from '../../../move'
import Procedure, { multiclass } from '../../../move_procedure'

const huntersBrother = new Move({
	title: 'Hunters Brother',
	text: 
`Choose one move from the ranger class list.`,

	procedure: new Procedure('', multiclass())
})

export default huntersBrother
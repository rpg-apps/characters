import Move from '../../../move'
import Procedure, { simultaneous } from '../../../move_procedure'

const ritual = new Move({
	title: 'Ritual',
	text: 
`When you draw on a place of power to create a magical effect`,

	procedure: new Procedure('When you draw on a place of power to create a magical effect', )
})

export default ritual
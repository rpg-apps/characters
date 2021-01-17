import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const hospitaller = new Move({
	title: 'Hospitaller',
	text: 
`When you heal an ally, you heal +1d8 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default hospitaller
import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const familiarPrey = new Move({
	title: 'Familiar Prey',
	text: 
`When you spout lore about a monster you use WIS instead of INT.`,

	procedure: new Procedure(CONSTANT, )
})

export default familiarPrey
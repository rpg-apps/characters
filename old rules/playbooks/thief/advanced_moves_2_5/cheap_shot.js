import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const cheapShot = new Move({
	title: 'Cheap Shot',
	text: 
`When using a precise or hand weapon, your backstab deals an extra +1d6 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default cheapShot
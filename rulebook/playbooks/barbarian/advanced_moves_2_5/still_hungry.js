import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const stillHungry = new Move({
	title: 'Still Hungry',
	text: 
`Choose an additional appetite.`,

	procedure: new Procedure(CONSTANT, )
})

export default stillHungry
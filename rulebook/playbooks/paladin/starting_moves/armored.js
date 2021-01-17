import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const armored = new Move({
	title: 'Armored',
	text: 
`You ignore the clumsy tag on armor you wear.`,

	procedure: new Procedure(CONSTANT, )
})

export default armored
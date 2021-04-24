import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const perfectKnight = new Move({
	title: 'Perfect Knight',
	text: 
`When you quest you choose three boons instead of two.`,

	procedure: new Procedure(CONSTANT, )
})

export default perfectKnight
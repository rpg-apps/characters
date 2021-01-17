import Move from '../../../move'
import Procedure, { choice, modifier, CONSTANT } from '../../../move_procedure'

const followMe = new Move({
	title: 'Follow Me',
	text: 
`When you undertake a perilous journey you can take two roles. You make a separate roll for each.`,

	procedure: new Procedure(CONSTANT, )
})

export default followMe
import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`When you Make Camp next to a large, open flame, regain all of your HP.`,

	procedure: new Procedure(CONSTANT, )
})

export default human
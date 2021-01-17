import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const halfling = new Move({
	title: 'Halfling',
	text: 
`When you attack with a ranged weapon, deal +2 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default halfling
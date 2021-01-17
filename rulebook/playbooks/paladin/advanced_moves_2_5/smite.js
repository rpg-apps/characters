import Move from '../../../move'
import Procedure, { condition, changeStat, STATS, CONSTANT } from '../../../move_procedure'

const smite = new Move({
	title: 'Smite',
	text: 
`While on a quest you deal +1d4 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default smite
import Move from '../../../move'
import Procedure, { condition, changeStat, STATS, CONSTANT } from '../../../move_procedure'

const divineProtection = new Move({
	title: 'Divine Protection',
	text: 
`When you wear no armor or shield you get 2 armor.`,

	procedure: new Procedure(CONSTANT, )
})

export default divineProtection
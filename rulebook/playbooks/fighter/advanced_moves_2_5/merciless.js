import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const merciless = new Move({
	title: 'Merciless',
	text: 
`When you deal damage, deal +1d4 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default merciless
import Move from '../../../move'
import Procedure, { modifier, hold } from '../../../move_procedure'

const balance = new Move({
	title: 'Balance',
	text: 
`When you deal damage, take 1 balance. When you touch someone and channel the spirits of life you may spend balance. For each balance spent, heal 1d4 HP.`,

	procedure: new Procedure('', )
})

export default balance
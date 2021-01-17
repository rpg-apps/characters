import Move from '../../../move'
import Procedure, { modifier, condition, CONSTANT } from '../../../move_procedure'

const arcaneWard = new Move({
	title: 'Arcane Ward',
	text: 
`As long as you have at least one prepared spell of first level or higher, you have +2 armor.`,

	procedure: new Procedure(CONSTANT, )
})

export default arcaneWard
import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const elf = new Move({
	title: 'Elf',
	text: 
`When you undertake a perilous journey through wilderness whatever job you take you succeed as if you rolled a 10+.`,

	procedure: new Procedure(CONSTANT, )
})

export default elf
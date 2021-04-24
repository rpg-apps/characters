import Move from '../../../move'
import Procedure, { choice, modifier } from '../../../move_procedure'

const dwarf = new Move({
	title: 'Dwarf',
	text: 
`When you share a drink with someone, you may parley with them using CON instead of CHA.`,

	procedure: new Procedure('When you share a drink with someone', )
})

export default dwarf
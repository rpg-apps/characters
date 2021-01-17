import Move from '../../../move'
import Procedure from '../../../move_procedure'

const enchanter = new Move({
	title: 'Enchanter',
	text: 
`When you have time and safety with a magic item you may ask the GM what it does, the GM will answer you truthfully.`,

	procedure: new Procedure('When you have time and safety with a magic item', Ask the GM what it does, the GM will answer you truthfully.)
})

export default enchanter
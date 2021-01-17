import Move from '../../../move'
import Procedure from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`When you pray for guidance, even for a moment, and ask, "What here is evil?" the GM will tell you, honestly.`,

	procedure: new Procedure('When you pray for guidance, even for a moment, and ask"What here is evil?"', The GM will tell you honestly)
})

export default human
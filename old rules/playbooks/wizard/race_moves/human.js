import Move from '../../../move'
import Procedure, { multiclass, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`Choose one cleric spell. You can cast it as if it was a wizard spell.`,

	procedure: new Procedure(CONSTANT, multiclass())
})

export default human
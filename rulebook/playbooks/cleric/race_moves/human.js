import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`Your faith is diverse. Choose one wizard spell. You can cast and be granted that spell as if it was a cleric spell.`,

	procedure: new Procedure(CONSTANT, )
})

export default human
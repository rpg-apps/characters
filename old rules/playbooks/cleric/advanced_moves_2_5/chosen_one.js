import Move from '../../../move'
import Procedure, { modifier } from '../../../move_procedure'

const chosenOne = new Move({
	title: 'Chosen One',
	text: 
`Choose one spell. You are granted that spell as if it was one level lower.`,

	procedure: new Procedure('', )
})

export default chosenOne
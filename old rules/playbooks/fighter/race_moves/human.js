import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`Once per battle you may reroll a single damage roll (yours or someone else’s).`,

	procedure: new Procedure(CONSTANT, )
})

export default human
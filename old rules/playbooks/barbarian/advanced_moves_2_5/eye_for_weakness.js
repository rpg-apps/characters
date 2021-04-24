import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const eyeForWeakness = new Move({
	title: 'Eye For Weakness',
	text: 
`When you discern realities add “What here is weak or vulnerable?” to the list of questions you can ask.`,

	procedure: new Procedure(CONSTANT, modifier('choice += "What here is weak or vulnerable?"', { on: 'discern realities' }))
})

export default eyeForWeakness
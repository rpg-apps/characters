import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`You are a professional. When you spout lore or discern realities about criminal activities, take +1.`,

	procedure: new Procedure(CONSTANT, )
})

export default human
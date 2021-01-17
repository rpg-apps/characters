import Move from '../../../move'
import Procedure, { CONSTANT } from '../../../move_procedure'

const thingTalker = new Move({
	title: 'Thing Talker',
	text: 
`You see the spirits in the sand, the sea and the stone. You may now apply your spirit tongue, shapeshifting and studied essence to inanimate natural objects (plants and rocks) or creatures made thereof, as well as animals. Thing-talker forms can be exact copies or can be mobile vaguely humanoid-shaped entities.`,

	procedure: new Procedure(CONSTANT, )
})

export default thingTalker
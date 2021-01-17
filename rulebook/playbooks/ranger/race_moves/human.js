import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const human = new Move({
	title: 'Human',
	text: 
`When you make camp in a dungeon or city, you don’t need to consume a ration.`,

	procedure: new Procedure(CONSTANT, )
})

export default human
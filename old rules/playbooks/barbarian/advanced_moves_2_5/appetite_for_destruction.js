import Move from '../../../move'
import Procedure, { multiclass, CONSTANT } from '../../../move_procedure'

const appetiteForDestruction = new Move({
	title: 'Appetite For Destruction',
	text: 
`Take a move from the fighter, bard or thief class list. You may not take multiclass moves from those classes.`,

	procedure: new Procedure(CONSTANT, multiclass(['fighter', 'bard', 'thief']))
})

export default appetiteForDestruction
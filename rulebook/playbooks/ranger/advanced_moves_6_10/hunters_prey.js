import Move from '../../../move'
import familiarPrey from '../advanced_moves_2_5/familiar_prey'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const huntersPrey = new Move({
	title: 'Hunters Prey',
	text: 
`When you spout lore about a monster you use WIS instead of INT. On a 12+, in addition to the normal effects, you get to ask the GM any one question about the subject.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: familiarPrey
})

export default huntersPrey
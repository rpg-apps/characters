import Move from '../../../move'
import wildEmpathy from '../advanced_moves_2_5/wild_empathy'

import Procedure, { CONSTANT } from '../../../move_procedure'

const wildSpeech = new Move({
	title: 'Wild Speech',
	text: 
`You can speak with and understand any non-magical, non-planar creature.`,

	procedure: new Procedure(CONSTANT, You can speak with and understand any non-magical, non-planar creature.),

    replaces: wildEmpathy
})

export default wildSpeech
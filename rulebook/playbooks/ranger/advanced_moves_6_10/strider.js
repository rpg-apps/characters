import Move from '../../../move'
import followMe from '../advanced_moves_2_5/follow_me'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const strider = new Move({
	title: 'Strider',
	text: 
`When you undertake a perilous journey you can take two roles. Roll twice and use the better result for both roles.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: followMe
})

export default strider
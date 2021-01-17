import Move from '../../../move'
import empower from '../advanced_moves_2_5/empower'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const greaterEmpower = new Move({
	title: 'Greater Empower',
	text: 
``,

	procedure: new Procedure(CONSTANT, ),

    replaces: empower
})

export default greaterEmpower
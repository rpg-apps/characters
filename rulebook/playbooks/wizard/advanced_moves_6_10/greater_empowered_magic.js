import Move from '../../../move'
import empoweredMagic from '../advanced_moves_2_5/empowered_magic'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const greaterEmpoweredMagic = new Move({
	title: 'Greater Empowered Magic',
	text: 
``,

	procedure: new Procedure(CONSTANT, ),

    replaces: empoweredMagic
})

export default greaterEmpoweredMagic
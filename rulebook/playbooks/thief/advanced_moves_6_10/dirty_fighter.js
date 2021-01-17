import Move from '../../../move'
import cheapShot from '../advanced_moves_2_5/cheap_shot'

import Procedure, { modifier, condition, CONSTANT } from '../../../move_procedure'

const dirtyFighter = new Move({
	title: 'Dirty Fighter',
	text: 
`When using a precise or hand weapon, your backstab deals an extra +1d8 damage and all other attacks deal +1d4 damage.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: cheapShot
})

export default dirtyFighter
import Move from '../../../move'
import scentOfBlood from '../advanced_moves_2_5/scent_of_blood'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const tasteOfBlood = new Move({
	title: 'Taste Of Blood',
	text: 
`When you hack and slash an enemy, your next attack against that same foe deals +1d8 damage.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: scentOfBlood
})

export default tasteOfBlood
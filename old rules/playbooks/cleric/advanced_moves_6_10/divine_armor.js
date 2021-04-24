import Move from '../../../move'
import divineProtection from '../advanced_moves_2_5/divine_protection'

import Procedure, { condition, changeStat, STATS, CONSTANT } from '../../../move_procedure'

const divineArmor = new Move({
	title: 'Divine Armor',
	text: 
`When you wear no armor or shield you get 3 armor.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: divineProtection
})

export default divineArmor
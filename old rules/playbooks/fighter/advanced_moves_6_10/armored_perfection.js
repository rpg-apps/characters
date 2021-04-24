import Move from '../../../move'
import armorMastery from '../advanced_moves_2_5/armor_mastery'

import Procedure, { choice, modifier, changeStat, STATS } from '../../../move_procedure'

const armoredPerfection = new Move({
	title: 'Armored Perfection',
	text: 
`When you choose to let your armor take the brunt of damage dealt to you, the damage is negated and you take +1 forward against the attacker, but you must reduce the armor value of your armor or shield (your choice) by 1. The value is reduced each time you make this choice. If the reduction leaves the item with 0 armor it is destroyed.`,

	procedure: new Procedure('When you choose to let your armor take the brunt of damage dealt to you', ),

    replaces: armorMastery
})

export default armoredPerfection
import Move from '../../../move'
import Procedure, { choice, changeStat, STATS } from '../../../move_procedure'

const armorMastery = new Move({
	title: 'Armor Mastery',
	text: 
`When you make your armor take the brunt of damage dealt to you, the damage is negated but you must reduce the armor value of your armor or shield (your choice) by 1. The value is reduced each time you make this choice. If the reduction leaves the item with 0 armor it is destroyed.`,

	procedure: new Procedure('When you make your armor take the brunt of damage dealt to you', )
})

export default armorMastery
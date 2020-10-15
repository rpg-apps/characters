import Move, { Procedure } from '../move'
import divineProtection from '../advanced_moves_2_5/divine_protection'

const { condition, changeStat, STATS, CONSTANT } = Procedure

const divineArmor = new Move({
	title: 'Divine Armor',
	text: 
`When you wear no armor or shield you get 3 armor.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: divineProtection
})

export default divineArmor
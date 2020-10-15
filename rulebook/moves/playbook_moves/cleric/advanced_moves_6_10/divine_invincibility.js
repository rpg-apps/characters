import Move, { Procedure } from '../move'
import divineIntervention from '../advanced_moves_2_5/divine_intervention'

const { hold, CONSTANT } = Procedure

const divineInvincibility = new Move({
	title: 'Divine Invincibility',
	text: 
`When you commune you gain 2 hold and lose any hold you already had. Spend that hold when you or an ally takes damage to call on your deity, who intervenes with an appropriate manifestation (a sudden gust of wind, a lucky slip, a burst of light) and negates the damage.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: divineIntervention
})

export default divineInvincibility
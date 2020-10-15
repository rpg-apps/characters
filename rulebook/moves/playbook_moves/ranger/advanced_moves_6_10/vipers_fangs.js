import Move, { Procedure } from '../move'
import vipersStrike from '../advanced_moves_2_5/vipers_strike'

const { modifier } = Procedure

const vipersFangs = new Move({
	title: 'Vipers Fangs',
	text: 
`When you strike an enemy with two weapons at once, add an extra 1d8 damage for your off-hand strike.`,

	procedure: new Procedure('When you strike an enemy with two weapons at once', ),

    replaces: vipersStrike
})

export default vipersFangs
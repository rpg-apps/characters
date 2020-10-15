import Move, { Procedure } from '../move'
import staunchDefender from '../advanced_moves_2_5/staunch_defender'

const { modifier, CONSTANT } = Procedure

const imperviousDefender = new Move({
	title: 'Impervious Defender',
	text: 
`When you defend you always get +1 hold, even on a 6-. When you get a 12+ to defend instead of getting hold the nearest attacking creature is stymied giving you a clear advantage, the GM will describe it.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: staunchDefender
})

export default imperviousDefender
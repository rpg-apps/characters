import Move, { Procedure } from '../move'
import cautious from '../advanced_moves_2_5/cautious'

const { modifier, CONSTANT } = Procedure

const extermelyCaution = new Move({
	title: 'Extermely Caution',
	text: 
`When you use trap expert you always get +1 hold, even on a 6-. On a 12+ you get 3 hold and the next time you come near a trap the GM will immediately tell you what it does, what triggers it, who set it, and how you can use it to your advantage.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: cautious
})

export default extermelyCaution
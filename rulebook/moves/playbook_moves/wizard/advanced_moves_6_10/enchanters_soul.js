import Move, { Procedure } from '../move'
import enchanter from '../advanced_moves_2_5/enchanter'

const {  } = Procedure

const enchantersSoul = new Move({
	title: 'Enchanters Soul',
	text: 
`When you have time and safety with a magic item in a place of power you can empower that item so that the next time you use it its effects are amplified, the GM will tell you exactly how.`,

	procedure: new Procedure('When you have time and safety with a magic item in a place of power', You can empower that item so that the next time you use it its effects are amplified, the GM will tell you exactly how.),

    requires: enchanter
})

export default enchantersSoul
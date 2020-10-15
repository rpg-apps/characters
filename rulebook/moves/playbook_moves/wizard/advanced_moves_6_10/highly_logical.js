import Move, { Procedure } from '../move'
import logical from '../advanced_moves_2_5/logical'

const { modifier, CONSTANT } = Procedure

const highlyLogical = new Move({
	title: 'Highly Logical',
	text: 
`When you use strict deduction to analyze your surroundings, you can discern realities with Int instead of Wis. On a 12+ you get to ask the GM any three questions, not limited by the list.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: logical
})

export default highlyLogical
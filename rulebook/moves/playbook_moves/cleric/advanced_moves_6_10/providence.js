import Move, { Procedure } from '../move'
import serenity from '../advanced_moves_2_5/serenity'

const { modifier } = Procedure

const providence = new Move({
	title: 'Providence',
	text: 
`You ignore the -1 penalty from two spells you maintain.`,

	procedure: new Procedure('', ),

    replaces: serenity
})

export default providence
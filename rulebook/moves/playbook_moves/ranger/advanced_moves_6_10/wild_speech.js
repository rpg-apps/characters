import Move, { Procedure } from '../move'
import wildEmpathy from '../advanced_moves_2_5/wild_empathy'

const { CONSTANT } = Procedure

const wildSpeech = new Move({
	title: 'Wild Speech',
	text: 
`You can speak with and understand any non-magical, non-planar creature.`,

	procedure: new Procedure(CONSTANT, You can speak with and understand any non-magical, non-planar creature.),

    replaces: wildEmpathy
})

export default wildSpeech
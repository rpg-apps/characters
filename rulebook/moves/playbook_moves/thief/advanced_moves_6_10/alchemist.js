import Move, { Procedure } from '../move'
import brewer from '../advanced_moves_2_5/brewer'

const { choice } = Procedure

const alchemist = new Move({
	title: 'Alchemist',
	text: 
`When you have you have time to gather materials and a safe place to brew`,

	procedure: new Procedure('When you have you have time to gather materials and a safe place to brew', ),

    replaces: brewer
})

export default alchemist
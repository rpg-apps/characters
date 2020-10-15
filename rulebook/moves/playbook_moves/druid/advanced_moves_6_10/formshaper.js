import Move, { Procedure } from '../move'
import formcrafter from '../advanced_moves_2_5/formcrafter'

const { modifier, condition } = Procedure

const formshaper = new Move({
	title: 'Formshaper',
	text: 
`You may increase your armor by 1 or deal an additional +1d4 damage while in an animal form. Choose which when you shapeshift.`,

	procedure: new Procedure('', ),

    requires: formcrafter
})

export default formshaper
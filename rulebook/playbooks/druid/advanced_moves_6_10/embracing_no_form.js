import Move from '../../../move'
import Procedure, { modifier } from '../../../move_procedure'

const embracingNoForm = new Move({
	title: 'Embracing No Form',
	text: 
`When you shapeshift, roll 1d4 and add that total to your hold.`,

	procedure: new Procedure('', )
})

export default embracingNoForm
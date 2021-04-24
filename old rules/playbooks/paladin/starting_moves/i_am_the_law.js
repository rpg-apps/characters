import Move from '../../../move'
import Procedure, { roll, choice, modifier, simultaneous } from '../../../move_procedure'

const iAmTheLaw = new Move({
	title: 'I Am The Law',
	text: 
`When you give an NPC an order based on your divine authority`,

	procedure: new Procedure('When you give an NPC an order based on your divine authority', roll('roll+Cha', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default iAmTheLaw
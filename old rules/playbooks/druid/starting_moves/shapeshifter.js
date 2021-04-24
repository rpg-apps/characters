import Move from '../../../move'
import Procedure, { roll, hold } from '../../../move_procedure'

const shapeshifter = new Move({
	title: 'Shapeshifter',
	text: 
`When you call upon the spirits to change your shape`,

	procedure: new Procedure('When you call upon the spirits to change your shape', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default shapeshifter
import Move from '../../../move'
import Procedure, { roll, hold } from '../../../move_procedure'

const trapExpert = new Move({
	title: 'Trap Expert',
	text: 
`When you spend a moment to survey a dangerous area`,

	procedure: new Procedure('When you spend a moment to survey a dangerous area', roll('roll+Dex', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default trapExpert
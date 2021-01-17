import Move from '../../../move'
import Procedure, { roll, choice } from '../../../move_procedure'

const bendBarsLiftGates = new Move({
	title: 'Bend Bars Lift Gates',
	text: 
`When you use pure strength to destroy an inanimate obstacle`,

	procedure: new Procedure('When you use pure strength to destroy an inanimate obstacle', roll('roll+Str', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default bendBarsLiftGates
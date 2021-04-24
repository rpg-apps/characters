import Move from '../../../move'
import Procedure, { roll, choice, simultaneous } from '../../../move_procedure'

const calledShot = new Move({
	title: 'Called Shot',
	text: 
`When you attack a defenseless or surprised enemy at range`,

	procedure: new Procedure('When you attack a defenseless or surprised enemy at range', roll('roll+Dex', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default calledShot
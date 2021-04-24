import Move from '../../../move'
import Procedure, { roll, choice, simultaneous } from '../../../move_procedure'

const throughDeathsEyes = new Move({
	title: 'Through Deaths Eyes',
	text: 
`When you go into battle`,

	procedure: new Procedure('When you go into battle', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default throughDeathsEyes
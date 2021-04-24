import Move from '../../../move'
import Procedure, { roll, choice, modifier } from '../../../move_procedure'

const burningBrand = new Move({
	title: 'Burning Brand',
	text: 
`When you conjure a weapon of pure flame`,

	procedure: new Procedure('When you conjure a weapon of pure flame', roll('roll+Con', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default burningBrand
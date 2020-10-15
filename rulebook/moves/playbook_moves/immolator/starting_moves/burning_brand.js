import Move, { Procedure } from '../move'

const { roll, choice, modifier } = Procedure

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
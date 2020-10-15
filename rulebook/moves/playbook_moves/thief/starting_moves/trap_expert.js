import Move, { Procedure } from '../move'

const { roll, hold } = Procedure

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
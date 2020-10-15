import Move, { Procedure } from '../move'

const { roll, hold } = Procedure

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
import Move, { Procedure } from '../move'

const { roll, choice } = Procedure

const backstab = new Move({
	title: 'Backstab',
	text: 
`When you attack a surprised or defenseless enemy with a melee weapon`,

	procedure: new Procedure('When you attack a surprised or defenseless enemy with a melee weapon', roll('roll+Dex', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default backstab
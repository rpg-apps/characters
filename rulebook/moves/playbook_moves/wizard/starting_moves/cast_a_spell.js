import Move, { Procedure } from '../move'

const { roll, choice } = Procedure

const castASpell = new Move({
	title: 'Cast A Spell',
	text: 
`When you release a spell you’ve prepared`,

	procedure: new Procedure('When you release a spell you’ve prepared', roll('roll+Int', {
		success: 'The spell is successfully cast and you do not forget the spell—you may cast it again later.',
		partialSuccess: '',
		miss: ''
	}))
})

export default castASpell
import Move, { Procedure } from '../move'

const { roll, choice } = Procedure

const huntAndTrack = new Move({
	title: 'Hunt And Track',
	text: 
`When you follow a trail of clues left behind by passing creatures`,

	procedure: new Procedure('When you follow a trail of clues left behind by passing creatures', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default huntAndTrack
import Move from '../../../move'
import Procedure, { roll, choice } from '../../../move_procedure'

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
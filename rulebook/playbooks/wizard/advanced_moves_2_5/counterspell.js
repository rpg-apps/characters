import Move from '../../../move'
import Procedure, { roll, choice } from '../../../move_procedure'

const counterspell = new Move({
	title: 'Counterspell',
	text: 
`When you attempt to counter an arcane spell that will otherwise affect you`,

	procedure: new Procedure('When you attempt to counter an arcane spell that will otherwise affect you', roll('roll+Int', {
		success: 'The spell is countered and has no effect on you.',
		partialSuccess: 'The spell is countered and you forget the spell you staked. Your counterspell protects only you; if the countered spell has other targets they get its effects.',
		miss: ''
	}))
})

export default counterspell
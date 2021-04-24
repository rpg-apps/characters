import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const communionOfWhispers = new Move({
	title: 'Communion Of Whispers',
	text: 
`When you spend time in a place, making note of its resident spirits and calling on the spirits of the land`,

	procedure: new Procedure('When you spend time in a place, making note of its resident spirits and calling on the spirits of the land', roll('roll+Wis', {
		success: '',
		partialSuccess: '',
		miss: ''
	}))
})

export default communionOfWhispers
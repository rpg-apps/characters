import Move from '../../../move'
import Procedure, { roll } from '../../../move_procedure'

const theEnkindler = new Move({
	title: 'The Enkindler',
	text: 
`When you bolster the courage of others roll+CHA. On a 10+ they shake off all fear and doubt, becoming brave in an instant. On a 7-9, this effect is fleeting, they realize its superficiality and resort to cowardice after a moment or two. On a miss, they’re cowed or terrified by your presence.`,

	procedure: new Procedure('When you bolster the courage of others', roll('roll+Cha', {
		success: 'They shake off all fear and doubt, becoming brave in an instant.',
		partialSuccess: 'This effect is fleeting, they realize its superficiality and resort to cowardice after a moment or two.',
		miss: 'They’re cowed or terrified by your presence.'
	}))
})

export default theEnkindler
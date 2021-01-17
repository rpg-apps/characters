import Move from '../../../move'
import Procedure, { choice, modifier, changeStat, STATS } from '../../../move_procedure'

const knowItAll = new Move({
	title: 'Know It All',
	text: 
`When another player’s character comes to you for advice and you tell them what you think is best, they get +1 forward when following your advice and you mark experience if they do.`,

	procedure: new Procedure('', )
})

export default knowItAll
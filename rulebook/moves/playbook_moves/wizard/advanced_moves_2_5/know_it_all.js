import Move, { Procedure } from '../move'

const { choice, modifier, changeStat, STATS } = Procedure

const knowItAll = new Move({
	title: 'Know It All',
	text: 
`When another player’s character comes to you for advice and you tell them what you think is best, they get +1 forward when following your advice and you mark experience if they do.`,

	procedure: new Procedure('', )
})

export default knowItAll
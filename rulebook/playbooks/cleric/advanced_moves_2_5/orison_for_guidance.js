import Move from '../../../move'
import Procedure, { changeStat, STATS } from '../../../move_procedure'

const orisonForGuidance = new Move({
	title: 'Orison For Guidance',
	text: 
`When you sacrifice something of value to your deity and pray for guidance, your deity tells you what it would have you do. If you do it, mark experience.`,

	procedure: new Procedure('When you sacrifice something of value to your deity and pray for guidance', )
})

export default orisonForGuidance
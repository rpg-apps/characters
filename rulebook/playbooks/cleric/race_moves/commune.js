import Move from '../../../move'
import Procedure, { modifier, condition, changeStat, STATS } from '../../../move_procedure'

const commune = new Move({
	title: 'Commune',
	text: 
`When you spend uninterrupted time (an hour or so) in quiet communion with your deity`,

	procedure: new Procedure('When you spend uninterrupted time (an hour or so) in quiet communion with your deity', )
})

export default commune
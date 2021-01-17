import Move from '../../../move'
import Procedure, { changeStat, STATS } from '../../../move_procedure'

const brakskin = new Move({
	title: 'Brakskin',
	text: 
`So long as your feet touch the ground you have +1 armor.`,

	procedure: new Procedure('As long as you feet touch the ground', )
})

export default brakskin
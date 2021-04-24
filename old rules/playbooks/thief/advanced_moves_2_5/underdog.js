import Move from '../../../move'
import Procedure, { changeStat, STATS } from '../../../move_procedure'

const underdog = new Move({
	title: 'Underdog',
	text: 
`When you’re outnumbered, you have +1 armor.`,

	procedure: new Procedure('When you’re outnumbered', )
})

export default underdog
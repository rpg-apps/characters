import Move from '../../../move'
import Procedure, { changeStat, STATS } from '../../../move_procedure'

const samson = new Move({
	title: 'Samson',
	text: 
`You may take a debility to immediately break free of any physical or mental restraint.`,

	procedure: new Procedure('When you take a debility', You may immdediately break free of any phisical or mental restraint)
})

export default samson
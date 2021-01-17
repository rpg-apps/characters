import Move from '../../../move'
import Procedure, { modifier } from '../../../move_procedure'

const holyProtection = new Move({
	title: 'Holy Protection',
	text: 
`You get +1 armor while on a quest.`,

	procedure: new Procedure('', )
})

export default holyProtection
import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const voiceOfAuthority = new Move({
	title: 'Voice Of Authority',
	text: 
`Take +1 to order hirelings.`,

	procedure: new Procedure(CONSTANT, )
})

export default voiceOfAuthority
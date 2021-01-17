import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const observant = new Move({
	title: 'Observant',
	text: 
`When you hunt and track, on a hit you may also ask one question about the creature you are tracking from the discern realities list for free.`,

	procedure: new Procedure(CONSTANT, )
})

export default observant
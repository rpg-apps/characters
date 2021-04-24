import Move from '../../../move'
import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const firstAid = new Move({
	title: 'First Aid',
	text: 
`Cure Light Wounds is a rote for you, and therefore doesn’t count against your limit of granted spells.`,

	procedure: new Procedure(CONSTANT, )
})

export default firstAid
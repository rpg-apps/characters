import Move from '../../../move'
import firstAid from '../advanced_moves_2_5/first_aid'

import Procedure, { modifier, CONSTANT } from '../../../move_procedure'

const greaterFirstAid = new Move({
	title: 'Greater First Aid',
	text: 
`Cure Moderate Wounds is a rote for you, and therefore doesn’t count against your limit of granted spells.`,

	procedure: new Procedure(CONSTANT, ),

    requires: firstAid
})

export default greaterFirstAid
import Move from '../../../move'
import firebrand from '../advanced_moves_2_5/firebrand'

import Procedure, { CONSTANT } from '../../../move_procedure'

const fanningTheFlames = new Move({
	title: 'Fanning The Flames',
	text: 
`You may apply the effects of your Firebrand move to a group of people – a dozen or so – all at once.`,

	procedure: new Procedure(CONSTANT, You may apply the effects of your Firebrand move to a group of people – a dozen or so – all at once.),

    requires: firebrand
})

export default fanningTheFlames
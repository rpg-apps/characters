import Move from '../../../move'
import appetiteForDestruction from '../advanced_moves_2_5/appetite_for_destruction'

import Procedure, { multiclass } from '../../../move_procedure'

const killEmAll = new Move({
	title: 'Kill Em All',
	text: 
`Take another move from the fighter, bard or thief class list. You may not take multiclass moves from those classes.`,

	procedure: new Procedure('', multiclass()),

    requires: appetiteForDestruction
})

export default killEmAll
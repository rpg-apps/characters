import Move from '../../../move'
import ironHide from '../advanced_moves_2_5/iron_hide'

import Procedure, { modifier, changeStat, STATS, CONSTANT } from '../../../move_procedure'

const steelHide = new Move({
	title: 'Steel Hide',
	text: 
`You gain +2 armor.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: ironHide
})

export default steelHide
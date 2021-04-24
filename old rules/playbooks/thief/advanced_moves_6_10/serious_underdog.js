import Move from '../../../move'
import underdog from '../advanced_moves_2_5/underdog'

import Procedure, { modifier, condition, CONSTANT } from '../../../move_procedure'

const seriousUnderdog = new Move({
	title: 'Serious Underdog',
	text: 
`You have +1 armor. When you’re outnumbered, you have +2 armor instead.`,

	procedure: new Procedure(CONSTANT, ),

    replaces: underdog
})

export default seriousUnderdog
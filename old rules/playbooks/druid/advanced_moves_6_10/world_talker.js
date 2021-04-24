import Move from '../../../move'
import thinkTalker from '../advanced_moves_2_5/think_talker'

import Procedure, { CONSTANT } from '../../../move_procedure'

const worldTalker = new Move({
	title: 'World Talker',
	text: 
`You see the patterns that make up the fabric of the world. You may now apply your spirit tongue, shapeshifter and studied essence moves to pure elements—fire, water, air and earth.`,

	procedure: new Procedure(CONSTANT, You may now apply your spirit tounge, shapeshifter and studied essence moves to pure elements - fire, water, air and earth.),

    replaces: thinkTalker
})

export default worldTalker
import Move, { Procedure } from '../../../move'

import Procedure, { simultaneous } from '../../../move_procedure'

const aPortInTheStorm = new Move({
	title: 'A Port In The Storm',
	text: 
`When you return to a civilized settlement you’ve visited before, tell the GM when you were last here. They’ll tell you how it’s changed since then.`,

	procedure: new Procedure('When you return to a civilized settlement you’ve visited before', simultaneous(
			'Tell the GM when you were last here.',
			'They’ll tell you how it’s changed since then.'
		))
})

export default aPortInTheStorm
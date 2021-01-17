import Move, { Procedure } from '../../../move'

import Procedure, { roll, simultaneous } from '../../../move_procedure'

const itGoesToEleven = new Move({
	title: 'It Goes To Eleven',
	text: 
`When you unleash a crazed performance (a righteous lute solo or mighty brass blast, maybe) choose a target who can hear you and roll+Cha.
* On a 10+ the target attacks their nearest ally in range.
* On a 7–9 they attack their nearest ally, but you also draw their attention and ire.`,

	procedure: new Procedure('When you unleash a crazed performance (a righteous lute solo or mighty brass blast, maybe)', roll('roll+Cha', {
		success: 'the target attacks their nearest ally in range.',
		partialSuccess: simultaneous('The target attacks their nearest ally in range.', 'You also draw their attention and ire.')
	}))
})

export default itGoesToEleven
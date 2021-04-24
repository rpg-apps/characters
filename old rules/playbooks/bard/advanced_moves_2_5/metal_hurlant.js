import Move, { Procedure } from '../../../move'

import Procedure, { roll, doDamage, multipleEffect } from '../../../move_procedure'

const metalHurlant = new Move({
	title: 'Metal Hurlant',
	text: 
`When you shout with great force or play a shattering note choose a target and roll+Con.
* On a 10+ the target takes 1d10 damage and is deafened for a few minutes.
* On a 7–9 you still damage your target, but it’s out of control: the GM will choose an additional target nearby.`,

	procedure: new Procedure('When you shout with great force or play a shattering note', roll('roll+Con', {
		success: doDamage('1d10'),
		partialSuccess: multipleEffect(doDamage('1d10'), 'The GM will choose an additional target nearby.')
	}))
})

export default metalHurlant
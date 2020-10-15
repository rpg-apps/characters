import Move, { Procedure } from '../move'

const { modifier } = Procedure

const setupStrike = new Move({
	title: 'Setup Strike',
	text: 
`When you hack and slash, choose an ally. Their next attack against your target does +1d4 damage.`,

	procedure: new Procedure('', )
})

export default setupStrike
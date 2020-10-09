import Move, { Procedure } from '../move'

const { condition } = Procedure

const smash = new Move({
	title: 'Smash',
	text: 
`When you hack and slash, on a 12+ deal your damage and choose something physical your target has (a weapon, their position, a limb): they lose it.`,

	procedure: new Procedure('When you hack and slash', Choose something physical your target has (a weapon, their position, a limb): they lose it.)
})

export default smash
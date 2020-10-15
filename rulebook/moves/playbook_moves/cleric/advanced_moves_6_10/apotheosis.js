import Move, { Procedure } from '../move'

const { choice, CONSTANT } = Procedure

const apotheosis = new Move({
	title: 'Apotheosis',
	text: 
`The first time you spend time in prayer as appropriate to your god after taking this move, choose a feature associated with your deity (rending claws, wings of sapphire feathers, an all-seeing third eye, etc.). When you emerge from prayer, you permanently gain that physical feature.`,

	procedure: new Procedure(CONSTANT, )
})

export default apotheosis
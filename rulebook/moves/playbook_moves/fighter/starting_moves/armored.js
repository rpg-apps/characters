import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const armored = new Move({
	title: 'Armored',
	text: 
`You ignore the clumsy tag on armor you wear.`,

	procedure: new Procedure(CONSTANT, )
})

export default armored
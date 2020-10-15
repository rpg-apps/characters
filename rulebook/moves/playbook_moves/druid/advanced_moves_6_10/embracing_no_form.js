import Move, { Procedure } from '../move'

const { modifier } = Procedure

const embracingNoForm = new Move({
	title: 'Embracing No Form',
	text: 
`When you shapeshift, roll 1d4 and add that total to your hold.`,

	procedure: new Procedure('', )
})

export default embracingNoForm
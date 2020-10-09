import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const eyeForWeakness = new Move({
	title: 'Eye For Weakness',
	text: 
`When you discern realities add “What here is weak or vulnerable?” to the list of questions you can ask.`,

	procedure: new Procedure(CONSTANT, )
})

export default eyeForWeakness
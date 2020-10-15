import Move, { Procedure } from '../move'

const { CONSTANT } = Procedure

const wildEmpathy = new Move({
	title: 'Wild Empathy',
	text: 
`You can speak with and understand animals.`,

	procedure: new Procedure(CONSTANT, You can speak with and understand animals.)
})

export default wildEmpathy
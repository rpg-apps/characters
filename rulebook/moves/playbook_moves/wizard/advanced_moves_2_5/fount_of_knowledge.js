import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const fountOfKnowledge = new Move({
	title: 'Fount Of Knowledge',
	text: 
`When you spout lore about something no one else has any clue about, take +1.`,

	procedure: new Procedure(CONSTANT, )
})

export default fountOfKnowledge
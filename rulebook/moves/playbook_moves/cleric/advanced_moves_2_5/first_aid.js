import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const firstAid = new Move({
	title: 'First Aid',
	text: 
`Cure Light Wounds is a rote for you, and therefore doesn’t count against your limit of granted spells.`,

	procedure: new Procedure(CONSTANT, )
})

export default firstAid
import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const scentOfBlook = new Move({
	title: 'Scent Of Blook',
	text: 
`When you hack and slash an enemy, your next attack against that same foe deals +1d4 damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default scentOfBlook
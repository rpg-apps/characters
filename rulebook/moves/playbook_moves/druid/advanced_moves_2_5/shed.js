import Move, { Procedure } from '../move'

const { choice, CONSTANT } = Procedure

const shed = new Move({
	title: 'Shed',
	text: 
`When you take damage while shapeshifted you may choose to revert to your natural form to negate the damage.`,

	procedure: new Procedure(CONSTANT, )
})

export default shed
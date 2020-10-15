import Move, { Procedure } from '../move'

const { roll, multipleEffects } = Procedure

const layOnHands = new Move({
	title: 'Lay On Hands',
	text: 
`When you touch someone, skin to skin, and pray for their well-being`,

	procedure: new Procedure('When you touch someone, skin to skin, and pray for their well-being', roll('roll+Cha', {
		success: 'You heal 1d8 damage or remove one disease.',
		partialSuccess: 'They are healed, but the damage or disease is transferred to you.',
		miss: ''
	}))
})

export default layOnHands
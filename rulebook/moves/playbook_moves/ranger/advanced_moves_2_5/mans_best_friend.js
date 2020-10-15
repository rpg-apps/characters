import Move, { Procedure } from '../move'

const { modifier } = Procedure

const mansBestFriend = new Move({
	title: 'Mans Best Friend',
	text: 
`When you allow your animal companion to take a blow that was meant for you, the damage is negated and your animal companion’s ferocity becomes 0. If its ferocity is already 0 you can’t use this ability. When you have a few hours of rest with your animal companion its ferocity returns to normal.`,

	procedure: new Procedure('When you allow your animal companion to take a blow that was meant for you', )
})

export default mansBestFriend
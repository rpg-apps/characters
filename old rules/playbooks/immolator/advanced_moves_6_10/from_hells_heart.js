import Move from '../../../move'
import Procedure, { CONSTANT } from '../../../move_procedure'

const fromHellsHeart = new Move({
	title: 'From Hells Heart',
	text: 
`Whenever you summon fire with any of your moves, you can replace it with the black fires of hell itself. This fire does not burn with heat and ignores armor, scorching the soul itself. Those creatures without souls cannot be harmed by this type of flame.`,

	procedure: new Procedure(CONSTANT, Whenever you summon fire with any of your moves, you can replace it with the black fires of hell itself.)
})

export default fromHellsHeart
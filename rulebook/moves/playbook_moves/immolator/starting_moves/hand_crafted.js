import Move, { Procedure } from '../move'

const { CONSTANT } = Procedure

const handCrafted = new Move({
	title: 'Hand Crafted',
	text: 
`You may use your hands in place of tools and fire to craft metal objects. Mundane weapons, armor and metal jewelry can all be formed from their raw components. You may unmake these things, as well, but to do so without time and safety might require that you Defy Danger first.`,

	procedure: new Procedure(CONSTANT, You may use your hands in place of tools and fire to craft metal objects. Mundane weapons, armor and metal jewelry can all be formed from their raw components. You may unmake these things, as well, but to do so without time and safety might require that you Defy Danger first.)
})

export default handCrafted
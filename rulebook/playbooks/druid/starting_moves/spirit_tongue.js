import Move from '../../../move'
import Procedure, { CONSTANT } from '../../../move_procedure'

const spiritTongue = new Move({
	title: 'Spirit Tongue',
	text: 
`The grunts, barks, chirps, and calls of the creatures of the wild are as language to you. You can understand any animal native to your land or akin to one whose essence you have studied.`,

	procedure: new Procedure(CONSTANT, You can understand animals)
})

export default spiritTongue
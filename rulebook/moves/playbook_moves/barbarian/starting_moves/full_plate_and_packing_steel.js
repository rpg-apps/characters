import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const fullPlateAndPackingSteel = new Move({
	title: 'Full Plate And Packing Steel',
	text: 
`You ignore the clumsy tag on armor you wear.`,

	procedure: new Procedure(CONSTANT, modifier('-clumsy', { ongoing: true }))
})

export default fullPlateAndPackingSteel
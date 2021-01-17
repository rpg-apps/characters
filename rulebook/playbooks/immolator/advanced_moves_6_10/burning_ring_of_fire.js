import Move from '../../../move'
import Procedure, { roll, simultaneous } from '../../../move_procedure'

const burningRingOfFire = new Move({
	title: 'Burning Ring Of Fire',
	text: 
`When you fuse a willing person’s soul to yours, roll+CHA. On a hit you are bound together, able to sense each other at any distance, as well as sharing your emotional state. On a 7-9, the connection is unstable and dangerous, when you take a debility, so do they (and vice versa). On a miss, the branding is rejected and you both erase any Bonds you have to each other. You may write new Bonds with them at the End of Session as usual. This fusion, once performed, cannot be undone by mortal means.`,

	procedure: new Procedure('When you fuse a willing person’s soul to yours', roll('roll+Cha', {
		success: 'On a hit you are bound together, able to sense each other at any distance, as well as sharing your emotional state.',
		partialSuccess: 'The connection is unstable and dangerous, when you take a debility, so do they (and vice versa)',
		miss: 'The branding is rejected and you both erase any Bonds you have to each other.'
	}))
})

export default burningRingOfFire
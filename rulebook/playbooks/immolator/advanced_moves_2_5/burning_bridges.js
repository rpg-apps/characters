import Move from '../../../move'
import Procedure, { roll, simultaneous } from '../../../move_procedure'

const burningBridges = new Move({
	title: 'Burning Bridges',
	text: 
`When you would take your last breath, don’t. Instead, you may erase one of your Bonds. This is permanent and lowers your total available Bonds forever. You are alive and have 1d6 hp. If you have no more Bonds, take your last breath as normal.`,

	procedure: new Procedure('When you would take your last breath', )
})

export default burningBridges
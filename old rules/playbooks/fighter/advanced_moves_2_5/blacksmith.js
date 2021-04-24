import Move from '../../../move'
import Procedure, { simultaneous } from '../../../move_procedure'

const blacksmith = new Move({
	title: 'Blacksmith',
	text: 
`When you have access to a forge you can graft the magical powers of a weapon onto your signature weapon. This process destroys the magical weapon. Your signature weapon gains the magical powers of the destroyed weapon.`,

	procedure: new Procedure('When you have access to a forge you can graft the magical powers of a weapon onto your signature weapon', )
})

export default blacksmith
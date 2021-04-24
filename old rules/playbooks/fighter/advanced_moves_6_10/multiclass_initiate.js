import Move from '../../../move'
import multiclassDabbler from '../advanced_moves_2_5/multiclass_dabbler'

import Procedure, { multiclass, CONSTANT } from '../../../move_procedure'

const multiclassInitiate = new Move({
	title: 'Multiclass Initiate',
	text: 
`Get one move from another class. Treat your level as one lower for choosing the move.`,

	procedure: new Procedure(CONSTANT, multiclass()),

    requires: multiclassDabbler
})

export default multiclassInitiate
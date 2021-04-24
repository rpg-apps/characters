import Move from '../../../move'
import penitent from '../advanced_moves_2_5/penitent'

import Procedure, { choice, modifier } from '../../../move_procedure'

const martyr = new Move({
	title: 'Martyr',
	text: 
`When you take damage and embrace the pain, you may take +1d4 damage (ignoring armor). If you do, take +1 forward to cast a spell and add your level to any damage done or healed by the spell.`,

	procedure: new Procedure('', ),

    replaces: penitent
})

export default martyr
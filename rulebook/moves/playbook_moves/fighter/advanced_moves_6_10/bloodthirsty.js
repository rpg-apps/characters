import Move, { Procedure } from '../move'
import merciless from '../advanced_moves_2_5/merciless'

const {  } = Procedure

const bloodthirsty = new Move({
	title: 'Bloodthirsty',
	text: 
`When you deal damage, deal +1d8 damage.`,

	procedure: new Procedure('', ),

    replaces: merciless
})

export default bloodthirsty
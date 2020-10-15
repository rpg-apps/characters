import Move, { Procedure } from '../move'
import charge from '../advanced_moves_2_5/charge'

const {  } = Procedure

const everOnward = new Move({
	title: 'Ever Onward',
	text: 
`When you lead the charge into combat, those you lead take +1 forward and +2 armor forward.`,

	procedure: new Procedure('When you lead the charge into combat', those you lead take +1 forward and +2 armor forward.),

    replaces: charge
})

export default everOnward
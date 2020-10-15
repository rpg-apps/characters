import Move, { Procedure } from '../move'

const { modifier } = Procedure

const reaper = new Move({
	title: 'Reaper',
	text: 
`When you take time after a conflict to dedicate your victory to your deity and deal with the dead, take +1 forward.`,

	procedure: new Procedure('When you take time after a conflict to dedicate your victory to your deity and deal with the dead', )
})

export default reaper
import Move, { Procedure } from '../move'

const { modifier } = Procedure

const indomitable = new Move({
	title: 'Indomitable',
	text: 
`When you suffer a debility (even through Bloody Aegis) take +1 forward against whatever caused it.`,

	procedure: new Procedure('', )
})

export default indomitable
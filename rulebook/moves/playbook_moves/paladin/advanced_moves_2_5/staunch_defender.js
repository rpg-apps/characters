import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const staunchDefender = new Move({
	title: 'Staunch Defender',
	text: 
`When you defend you always get +1 hold, even on a 6-.`,

	procedure: new Procedure(CONSTANT, )
})

export default staunchDefender
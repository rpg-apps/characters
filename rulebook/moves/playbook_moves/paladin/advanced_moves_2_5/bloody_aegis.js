import Move, { Procedure } from '../move'

const { changeStat, STATS } = Procedure

const bloodyAegis = new Move({
	title: 'Bloody Aegis',
	text: 
`When you take damage you can grit your teeth and accept the blow. If you do you take no damage but instead suffer a debility of your choice. If you already have all six debilities you can’t use this move.`,

	procedure: new Procedure('', )
})

export default bloodyAegis
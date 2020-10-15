import Move, { Procedure } from '../move'

const { changeStat, STATS } = Procedure

const brakskin = new Move({
	title: 'Brakskin',
	text: 
`So long as your feet touch the ground you have +1 armor.`,

	procedure: new Procedure('As long as you feet touch the ground', )
})

export default brakskin
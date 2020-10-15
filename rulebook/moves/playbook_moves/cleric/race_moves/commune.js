import Move, { Procedure } from '../move'

const { modifier, condition, changeStat, STATS } = Procedure

const commune = new Move({
	title: 'Commune',
	text: 
`When you spend uninterrupted time (an hour or so) in quiet communion with your deity`,

	procedure: new Procedure('When you spend uninterrupted time (an hour or so) in quiet communion with your deity', )
})

export default commune
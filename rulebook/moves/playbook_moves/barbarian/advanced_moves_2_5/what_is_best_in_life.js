import Move, { Procedure } from '../move'

const { changeStat, STATS } = Procedure

const whatIsBestInLife = new Move({
	title: 'What Is Best In Life',
	text: 
`At the end of a session, if during this session you have crushed your enemies, seen them driven before you, or have heard the lamentations of their kinfolk mark XP.`,

	procedure: new Procedure('At the end of a session', )
})

export default whatIsBestInLife
import Move, { Procedure } from '../move'

const { modifier, CONSTANT } = Procedure

const theDruidSleep = new Move({
	title: 'The Druid Sleep',
	text: 
`When you take this move, the next opportunity that you have safety and time to spend in an appropriate location, you may attune yourself to a new land. This effect occurs only once and the GM will tell you how long it will take and what cost you must pay. From then on, you are considered to be born of the soil in both lands.`,

	procedure: new Procedure(CONSTANT, )
})

export default theDruidSleep
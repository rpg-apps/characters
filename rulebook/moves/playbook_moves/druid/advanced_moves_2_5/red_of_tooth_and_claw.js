import Move, { Procedure } from '../move'

const { changeStat, STATS } = Procedure

const redOfToothAndClaw = new Move({
	title: 'Red Of Tooth And Claw',
	text: 
`When you are in an appropriate animal form (something dangerous) increase your damage to d8.`,

	procedure: new Procedure('When you are in an appropriate animal form (something dangerous)', )
})

export default redOfToothAndClaw
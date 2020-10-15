import Move, { Procedure } from '../move'

const {  } = Procedure

const poisonMaster = new Move({
	title: 'Poison Master',
	text: 
`After you’ve used a poison once it’s no longer dangerous for you to use.`,

	procedure: new Procedure('After you’ve used a poison once', It’s no longer dangerous for you to use.)
})

export default poisonMaster
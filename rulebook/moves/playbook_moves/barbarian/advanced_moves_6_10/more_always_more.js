import Move, { Procedure } from '../move'

const { choice, changeStat, STATS } = Procedure

const moreAlwaysMore = new Move({
	title: 'More Always More',
	text: 
`When you satisfy an appetite to the extreme (destroying something unique and significant, gaining enormous fame, riches, power, etc.) you may choose to resolve it. Cross it off the list and mark XP. While you may pursue that appetite again, you no longer feel the burning desire you once did. In its place, choose a new appetite from the list or write your own.`,

	procedure: new Procedure('When you satisfy an appetite to the extreme (destroying something unique and significant, gaining enormous fame, riches, power, etc.)', )
})

export default moreAlwaysMore
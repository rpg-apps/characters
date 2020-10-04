import Move from '../move'

const undertakeAPeriliousJourney = new Move({
	title: 'Undertake a Perilous Journey',
	text: 
`When you travel through hostile territory, choose one member of the party to act as trailblazer, one to scout ahead, and one to be quartermaster. Each character with a job to do rolls+Wis.
* On a 10+:
	* the quartermaster reduces the number of rations required by one
	* the trailblazer reduces the amount of time it takes to reach your destination (the GM will say by how much)
	* the scout will spot any trouble quick enough to let you get the drop on it
* On a 7–9, each role performs their job as expected: the normal number of rations are consumed, the journey takes about as long as expected, no one gets the drop on you but you don’t get the drop on them either.

You can’t assign more than one job to a character. If you don’t have enough party members, or choose not to assign a job, treat that job as if it had been assigned and the responsible player had rolled a 6.`
})

export default undertakeAPeriliousJourney

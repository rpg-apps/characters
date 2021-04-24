import Move from '../move'
import Procedure, { roll, simultaneous } from '../move_procedure'

const outstandingWarrants = new Move({
	title: 'Outstanding Warrants',
	text: 
`When you return to a civilized place in which you’ve caused trouble before, roll+Cha.
* On a 10+, word has spread of your deeds and everyone recognizes you.
* On a 7–9, as above, and the GM chooses a complication:
	* The local constabulary has a warrant out for your arrest.
	* Someone has put a price on your head.
	* Someone important to you has been put in a bad spot as a result of your actions.`,

	procedure: new Procedure('When you return to a civilized place in which you’ve caused trouble before', roll('roll+Cha', {
		success: 'Word has spread of your deeds and everyone recognizes you.',
		partialSuccess: simultaneous(
			'Word has spread of your deeds and everyone recognizes you.',
			'The GM chooses a complication: the local constabulary has a warrant out for your arrest, someone has put a price on your head or someone important to you has been put in a bad spot as a result of your actions.')
	}))
})

export default outstandingWarrants
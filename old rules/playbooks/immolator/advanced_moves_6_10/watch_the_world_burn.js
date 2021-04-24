import Move from '../../../move'
import Procedure from '../../../move_procedure'

const watchTheWorldBurn = new Move({
	title: 'Watch The World Burn',
	text: 
`When you open a channel to the burning planes and call a firestorm, tell the GM what you’re sacrificing and roll+WIS. The sky opens up and fire pours like rain from it within an area about equal to a small village. Everyone and everything in the area takes damage as appropriate. On a 10+ you can extinguish the storm with a little effort. On a 7-9 the fires rage out of your control, spreading and gusting where they are carried by wind and weather. On a miss, something cruel, intelligent and hungry comes with the storm.`,

	procedure: new Procedure('', )
})

export default watchTheWorldBurn
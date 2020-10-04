import Move from '../move'

const takeWatch = new Move({
	title: 'Take Watch',
	text: 
`When you’re on watch and something approaches the camp roll+Wis.
* On a 10+, you’re able to wake the camp and prepare a response, everyone in the camp takes +1 forward.
* On a 7–9, you react just a moment too late; your companions in camp are awake but haven’t had time to prepare. They have weapons and armor but little else.
* On a miss, whatever lurks outside the campfire’s light has the drop on you.`
})

export default takeWatch

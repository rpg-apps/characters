import Move, { Procedure } from '../move'

const { roll, effect, multipleEffects } = Procedure

const spoutLore = new Move({
	title: 'Spout Lore',
	text: 
`When you consult your accumulated knowledge about something, roll+Int.
* On a 10+, the GM will tell you something interesting and useful about the subject relevant to your situation.
* On a 7–9, the GM will only tell you something interesting—it’s on you to make it useful.
The GM might ask you “How do you know this?” Tell them the truth, now.`,

	procedure: new Procedure('When you consult your accumulated knowledge about something', roll('roll+Int', {
		success: multipleEffects(
			effect('the GM will tell you something interesting and useful about the subject relevant to your situation.'),
			effect('The GM might ask you “How do you know this?” Tell them the truth, now.')),
		partialSuccess: multipleEffects(
			effect('the GM will only tell you something interesting — it’s on you to make it useful.'),
			effect('The GM might ask you “How do you know this?” Tell them the truth, now.'))
	}))
})

export default spoutLore
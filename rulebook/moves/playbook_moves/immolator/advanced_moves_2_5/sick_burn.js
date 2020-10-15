import Move, { Procedure } from '../move'

const { roll } = Procedure

const sickBurn = new Move({
	title: 'Sick Burn',
	text: 
`When you insult an NPC, roll + CHA. On a 10+ you leave them no room to react, they bear your insult and the scorn of all who hear it. On a 7-9 you cross a line, they will have their revenge, someday. On a miss you’ve gone too far, they blow up here and now.`,

	procedure: new Procedure('When you insult an NPC', roll('roll+Cha', {
		success: 'Tou leave them no room to react, they bear your insult and the scorn of all who hear it.',
		partialSuccess: 'You cross a line, they will have their revenge, someday.',
		miss: 'you’ve gone too far, they blow up here and now.'
	}))
})

export default sickBurn
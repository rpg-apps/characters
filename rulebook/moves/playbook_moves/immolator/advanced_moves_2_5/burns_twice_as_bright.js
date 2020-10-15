import Move, { Procedure } from '../move'

const { choice, modifier, CONSTANT } = Procedure

const burnsTwiceAsBright = new Move({
	title: 'Burns Twice As Bright',
	text: 
`When you channel the flames of fate, you may treat a missed roll as a 7-9 or a 7-9 result as a 10+. This may be a roll you or another character has made. Tell the GM something you’ve lost; an emotion, a memory or some innate piece of your being. You may not use this move again until you’ve used Burns Half As Long.`,

	procedure: new Procedure(CONSTANT, )
})

export default burnsTwiceAsBright
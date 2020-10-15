import Move, { Procedure } from '../move'

const { modifier } = Procedure

const smaugsBelly = new Move({
	title: 'Smaugs Belly',
	text: 
`When you know your target’s weakest point your arrows have 2 piercing.`,

	procedure: new Procedure('When you know your target’s weakest point', )
})

export default smaugsBelly
import Move, { Procedure } from '../move'

const { modifier } = Procedure

const exterminatus = new Move({
	title: 'Exterminatus',
	text: 
`When you speak aloud your promise to defeat an enemy, you deal +2d4 damage against that enemy and -4 damage against anyone else. This effect lasts until the enemy is defeated. If you fail to defeat the enemy or give up the fight, you can admit your failure, but the effect continues until you find a way to redeem yourself.`,

	procedure: new Procedure('When you speak aloud your promise to defeat an enemy', )
})

export default exterminatus
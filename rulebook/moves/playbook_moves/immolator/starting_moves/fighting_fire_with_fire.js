import Move, { Procedure } from '../move'

const { roll, choice, changeStat, STATS } = Procedure

const fightingFireWithFire = new Move({
	title: 'Fighting Fire With Fire',
	text: 
`When you take damage, and that damage is odd (after armor) the flames within you come to your aid. Roll 1d4 and either add that many uses to your burning brand (if active), take that result forward to summon your burning brand, or reduce the damage by that amount, your choice.`,

	procedure: new Procedure('When you take damage, and that damage is odd (after armor)', )
})

export default fightingFireWithFire
import Move, { Procedure } from '../move'

const { roll, choice, hold, effect } = Procedure

const holdUsageOptions = [
	effect('Redirect an attack from the thing you defend to yourself.'),
	effect('Halve the attack’s effect or damage.'),
	choice('Open up the attacker to an ally giving that ally +1 forward against the attacker.', {
		'The ally is you': modifier('+1', { on: 'against the attacker', usages: 1 })
		'The ally is not you': effect('that ally gets +1 forward against the attacker.')
	}),
	effect('Deal damage to the attacker equal to your level.')
]

const defend = new Move({
	title: 'Defend',
	text: 
`When you stand in defense of a person, item, or location under attack, roll+Con.
* On a 10+, hold 3.
* On a 7–9, hold 1.
As long as you stand in defense, when you or the thing you defend is attacked you may spend hold, 1 for 1, to choose an option:
* Redirect an attack from the thing you defend to yourself.
* Halve the attack’s effect or damage.
* Open up the attacker to an ally giving that ally +1 forward against the attacker.
* Deal damage to the attacker equal to your level.`,

	procedure: new Procedure('When you stand in defense of a person, item, or location under attack', roll('roll+Con', {
		success: hold(3, holdUsageOptions),
		partialSuccess: hold(1, holdUsageOptions)
	}))
})

export default defend
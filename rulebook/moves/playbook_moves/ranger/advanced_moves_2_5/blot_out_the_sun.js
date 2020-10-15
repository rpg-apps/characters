import Move, { Procedure } from '../move'

const { multipleEffects } = Procedure

const blotOutTheSun = new Move({
	title: 'Blot Out The Sun',
	text: 
`When you volley you may spend extra ammo before rolling. For each point of ammo spent you may choose an extra target. Roll once and apply damage to all targets.`,

	procedure: new Procedure('', )
})

export default blotOutTheSun
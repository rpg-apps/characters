import Move, { Procedure } from '../move'

const bardicLore = new Move({
	title: 'Bardic Lore',
	text: 
`Choose an area of expertise:
* Spells and Magicks
* The Dead and Undead
* Grand Histories of the Known World
* A Bestiary of Creatures Unusual
* The Planar Spheres
* Legends of Heroes Past
* Gods and Their Servants
When you first encounter an important creature, location, or item (your call) covered by your bardic lore you can ask the GM any one question about it; the GM will answer truthfully. The GM may then ask you what tale, song, or legend you heard that information in.`,

	procedure: new Procedure('When you first encounter an important creature, location, or item (your call) covered by your bardic lore', 'ask the GM any one question about it; the GM will answer truthfully.')
})

export default bardicLore
import Equipment, { TAGS } from './equipment'

const adventuringGear = new Equipment({
	name: 'Adventuring Gear',
	tags: [TAGS.COST('20 coins'), TAGS.WEIGHT('1'), TAGS.USES('5')]
})

export default adventuringGear
export default class Equipment {
  constructor({ name, tags, description }) {
  	Object.assign(this, { name, tags, description })
  }
}

Equipment.Tag = class EquipmentTag {
  constructor(name, description) {
  	Object.assign(this, { name, description })
  }	
}

Equipment.NumberedTag = class EquipmentNumberedTag extends Equipment.Tag {
  constructor({ name, description, count }) {
  	super(name, description)
  	Object.assign(this, { count })
  }	
}

Equipment.TAGS = {
	// Generic Stats
	COST: cost => new Eqipment.NumberedTag({ name: 'Cost', count: cost, description: ' How much it costs to buy, normally. If the cost includes “-Charisma” a little negotiation subtracts the haggler’s Charisma score (not modifier) from the price.' }),
	WEIGHT: weight => new Eqipment.NumberedTag({ name: 'Weight', count: weight, description: ' Count the listed amount against your load. Something with no listed weight isn’t designed to be carried. 100 coins in standard denominations is 1 weight. The same value in gems or fine art may be lighter or heavier.' }),
	USES: uses => new Eqipment.NumberedTag({ name: 'Uses', count: uses, description: 'It can only be used n times.' }),

	// General tags
	AWKWARD: new Eqipment.Tag('Awkward', 'It’s unwieldy and tough to use.'),
	DANGEROUS: new Eqipment.Tag('Dangerous', 'It’s easy to get in trouble with it. If you interact with it without proper precautions the GM may freely invoke the consequences of your foolish actions.'),
	RATION: new Eqipment.Tag('Ration', 'It’s edible, more or less.'),
	SLOW: new Eqipment.Tag('Slow', 'It takes minutes or more to use.'),
	TWO_HANDED: new Eqipment.Tag('Two-handed', ' It takes two hands to use it effectively.'),
	WORN: new Eqipment.Tag('Worn', 'To use it, you have to be wearing it.'), 
	REQUIRES: requirement => new Eqipment.Tag(`Requires ${requirement}`, 'It’s only useful to certain people. If you don’t meet the requirements it works poorly, if at all.'),
	
	// Poisons
	APPLIED: new Eqipment.Tag('Applied', 'It’s only useful when carefully applied to a person or to something they eat or drink.'),
	TOUCH: new Eqipment.Tag('Touch', 'It’s used by touching it to the target’s skin.'),

	// Weapons
	AMMO: ammo => new Eqipment.NumberedTag({ name: 'ammo', count: ammo, description: '' }),
	DAMAGE_ADDITION: damage => new Eqipment.NumberedTag({ name: `+${damage} Damage`, count: damage, description: '' }),
	PIERCING: piercing => new Eqipment.NumberedTag({ name: `${piercing} Piercing`, count: piercing, description: '' }),
	FORCEFUL: new Eqipment.Tag('Forcefull', ''),
	IGNORES_ARMOR: new Eqipment.Tag('Ignores Armor', ''),
	MESSY: new Eqipment.Tag('Messy', ''),
	PERCISE: new Eqipment.Tag('Percise', ''),
	RELOAD: new Eqipment.Tag('Reload', ''),
	STUN: new Eqipment.Tag('Stun', ''),
	THROWN: new Eqipment.Tag('Thrown', ''),
	
	// Ranges
	HAND: new Eqipment.Tag('Hand', ''),
	CLOSE: new Eqipment.Tag('Close', ''),
	REACH: new Eqipment.Tag('Reach', ''),
	NEAR: new Eqipment.Tag('Near', ''),
	FAR: new Eqipment.Tag('Far', ''),

	// Armor
	ARMOR: armor => new Eqipment.NumberedTag({ name: `${armor} Armor`, count: armor, description: '' }),
	ARMOR_ADDITION: armor => new Eqipment.NumberedTag({ name: `+${armor} Armor`, count: armor, description: '' }),
	CLUMSY: new Eqipment.Tag('CLUMSYlumsy', '')
}
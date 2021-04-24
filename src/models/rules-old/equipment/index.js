export default class Equipment {
  constructor({ name, tags, description }) {
  	Object.assign(this, { name, tags, description })
  }
}

Equipment.Tag = class EquipmentTag {
  constructor({ name, description }) {
  	Object.assign(this, { name, description })
  }	
}

Equipment.NumberedTag = class EquipmentNumberedTag extends Equipment.Tag {
  constructor({ name, description, count }) {
  	super({ name, description })
  	Object.assign(this, { count })
  }	
}

Equipment.TAGS = {
	// Generic Stats
	COST: cost => new Eqipment.NumberedTag({ name: 'Cost', count: cost, description: ' How much it costs to buy, normally. If the cost includes “-Charisma” a little negotiation subtracts the haggler’s Charisma score (not modifier) from the price.' }),
	WEIGHT: weight => new Eqipment.NumberedTag({ name: 'Weight', count: weight, description: ' Count the listed amount against your load. Something with no listed weight isn’t designed to be carried. 100 coins in standard denominations is 1 weight. The same value in gems or fine art may be lighter or heavier.' }),
	USES: uses => new Eqipment.NumberedTag({ name: 'Uses', count: uses, description: 'It can only be used n times.' }),

	// General tags
	AWKWARD: new Equipment.Tag({ name: 'Awkward', description: 'It’s unwieldy and tough to use.' }),
	DANGEROUS: new Equipment.Tag({ name: 'Dangerous', description: 'It’s easy to get in trouble with it. If you interact with it without proper precautions the GM may freely invoke the consequences of your foolish actions.' }),
	RATION: new Equipment.Tag({ name: 'Ration', description: 'It’s edible, more or less.' }),
	SLOW: new Equipment.Tag({ name: 'Slow', description: 'It takes minutes or more to use.' }),
	TWO_HANDED: new Equipment.Tag({ name: 'Two-handed', description: ' It takes two hands to use it effectively.' }),
	WORN: new Equipment.Tag({ name: 'Worn', description: 'To use it, you have to be wearing it.' }), 
	REQUIRES: requirement => new Equipment.Tag({ name: `Requires ${requirement}`, description: 'It’s only useful to certain people. If you don’t meet the requirements it works poorly, if at all.' }),
	
	// Poisons
	APPLIED: new Equipment.Tag({ name: 'Applied', description: 'It’s only useful when carefully applied to a person or to something they eat or drink.' }),
	TOUCH: new Equipment.Tag({ name: 'Touch', description: 'It’s used by touching it to the target’s skin.' }),

	// Weapons
	AMMO: ammo => new Eqipment.NumberedTag({ name: 'ammo', count: ammo, description: '' }),
	DAMAGE_ADDITION: damage => new Eqipment.NumberedTag({ name: `+${damage} Damage`, count: damage, description: '' }),
	PIERCING: piercing => new Eqipment.NumberedTag({ name: `${piercing} Piercing`, count: piercing, description: '' }),
	FORCEFUL: new Equipment.Tag({ name: 'Forcefull', description: '' }),
	IGNORES_ARMOR: new Equipment.Tag({ name: 'Ignores Armor', description: '' }),
	MESSY: new Equipment.Tag({ name: 'Messy', description: '' }),
	PERCISE: new Equipment.Tag({ name: 'Percise', description: '' }),
	RELOAD: new Equipment.Tag({ name: 'Reload', description: '' }),
	STUN: new Equipment.Tag({ name: 'Stun', description: '' }),
	THROWN: new Equipment.Tag({ name: 'Thrown', description: '' }),
	
	// Ranges
	HAND: new Equipment.Tag({ name: 'Hand', description: '' }),
	CLOSE: new Equipment.Tag({ name: 'Close', description: '' }),
	REACH: new Equipment.Tag({ name: 'Reach', description: '' }),
	NEAR: new Equipment.Tag({ name: 'Near', description: '' }),
	FAR: new Equipment.Tag({ name: 'Far', description: '' }),

	// Armor
	ARMOR: armor => new Eqipment.NumberedTag({ name: `${armor} Armor`, count: armor, description: '' }),
	ARMOR_ADDITION: armor => new Eqipment.NumberedTag({ name: `+${armor} Armor`, count: armor, description: '' }),
	CLUMSY: new Equipment.Tag({ name: 'CLUMSYlumsy', description: '' })
}
export default class Equipment {
  constructor({ name, tags }) {
  	Object.assign(this, { name, cost, weight, uses, tags })
  }
}

Equipment.Tag = class EquipmentTag {
  constructor(name) {
  	Object.assign(this, { name })
  }	
}

Equipment.NumberedTag = class EquipmentNumberedTag extends Equipment.Tag {
  constructor({ name, count }) {
  	super(name)
  	Object.assign(this, { count })
  }	
}

Equipment.TAGS = {
	// Generic Stats
	COST: cost => new Equipment.NumberedTag({ name: 'Cost', count: cost }),
	WEIGHT: weight => new Equipment.NumberedTag({ name: 'Weight', count: weight }),
	USES: uses => new Equipment.NumberedTag({ name: 'Uses', count: uses }),

	// General tags
	AWKWARD: new Equipment.Tag('Awkward'),
	DANGEROUS: new Equipment.Tag('Dangerous'),
	RATION: new Equipment.Tag('Ration'),
	REQUIRES: requirement => new Equipment.Tag(`Requires ${requirement}`),
	SLOW: new Equipment.Tag('Slow'),
	TWO_HANDED: new Equipment.Tag('Two-handed'),
	WORN: new Equipment.Tag('Worn'), 
	
	// Poisons
	APPLIED: new Equipment.Tag('Applied'),
	TOUCH: new Equipment.Tag('Touch'),

	// Weapons
	AMMO: ammo => new Equipment.NumberedTag({ name: 'ammo', count: ammo }),
	DAMAGE_ADDITION: damage => new Equipment.NumberedTag({ name: `+${damage} Damage`, count: damage }),
	PIERCING: piercing => new Equipment.NumberedTag({ name: `${piercing} Piercing`, count: piercing }),
	FORCEFUL: new Equipment.Tag('Forcefull'),
	IGNORES_ARMOR: new Equipment.Tag('Ignores Armor'),
	MESSY: new Equipment.Tag('Messy'),
	PERCISE: new Equipment.Tag('Percise'),
	RELOAD: new Equipment.Tag('Reload'),
	STUN: new Equipment.Tag('Stun'),
	THROWN: new Equipment.Tag('Thrown'),
	
	// Ranges
	HAND: new Equipment.Tag('Hand'),
	CLOSE: new Equipment.Tag('Close'),
	REACH: new Equipment.Tag('Reach'),
	NEAR: new Equipment.Tag('Near'),
	FAR: new Equipment.Tag('Far'),

	// Armor
	ARMOR: armor => new Equipment.NumberedTag({ name: `${armor} Armor`, count: armor }),
	ARMOR_ADDITION: armor => new Equipment.NumberedTag({ name: `+${armor} Armor`, count: armor }),
	CLUMSY: new Equipment.Tag('CLUMSYlumsy')
}
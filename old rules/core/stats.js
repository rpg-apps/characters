const STATS = {
	HP: 'hp',
	XP: 'xp',
	LVL: 'level',
	ARMOR: 'armor',
	MAX_HP: 'maxHP',
	DAMAGE: 'damage',
	
	STRENGTH: 'Strength',
	DEXTERITY: 'Dexterity',
	CONSITUTION: 'Constitution',
	INTELLIGENCE: 'Intelligence',
	WISDOM: 'Wisdom',
	CHRASIMA: 'Charisma',

	STR: 'STR',
	DEX: 'DEX',
	CON: 'CON',
	INT: 'INT',
	WIS: 'WIS',
	CHA: 'CHA',

	rollModifier: stat => {
		if (stat < 9)	return -1
		if (stat < 13)	return 0
		if (stat < 16)	return 1
		if (stat < 18)	return 2
		else			return 3
	}

	WEAK: 'Weak',
	SHAKEY: 'Shakey',
	SICK: 'Sick',
	STUNNED: 'Stunned',
	CONFUSED: 'Confused',
	SCARRED: 'Scarred'
}

export default STATS
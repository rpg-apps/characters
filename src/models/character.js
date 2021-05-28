export default class Character {
  constructor (props) {
    Object.assign(this, props)
  }

  info () {
    return {
      active: this.active,
      adventure: this.adventure,
      name: this.name,
      race: this.race,
      characterClass: this.characterClass,
      bio: this.bio,
      look: this.look,
      alignment: this.alignment,
    }
  }

  status () {
    return {
      level: this.level,
      xp: this.xp,
      armor: this.armor,
      damage: this.damage,
      hp: this.hp,
      maxHp: this.maxHp,
      bonds: this.bonds
    }
  }

  stats () {
    return [
      { name: 'Strength', value: this.strength, modifier: this.str, debility: { name: 'Weak', value: this.weak } },
      { name: 'Dexterity', value: this.dexterity, modifier: this.dex, debility: { name: 'Shaky', value: this.shaky } },
      { name: 'Constitution', value: this.constitution, modifier: this.con, debility: { name: 'Sick', value: this.sick } },
      { name: 'Intelligence', value: this.intelligence, modifier: this.int, debility: { name: 'Stunned', value: this.stunned } },
      { name: 'Wisdom', value: this.wisdom, modifier: this.wis, debility: {name: 'Confused', value: this.confused } },
      { name: 'Charisma', value: this.charisma, modifier: this.cha, debility: { name: 'Scarred', value: this.scarred } }
    ]
  }
}
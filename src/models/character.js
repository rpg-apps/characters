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
      { name: 'Strength', value: this.strength, debility: this.weak },
      { name: 'Dexterity', value: this.dexterity, debility: this.shaky },
      { name: 'Constitution', value: this.constitution, debility: this.sick },
      { name: 'Intelligence', value: this.intelligence, debility: this.stunned },
      { name: 'Wisdom', value: this.wisdom, debility: this.confused },
      { name: 'Charisma', value: this.charisma, debility: this.scarred }
    ]
  }
}
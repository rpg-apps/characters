export default class Character {
  constructor (props) {
    Object.assign(this, props)
  }

  calc (formula) {
    return this.context.getValue(formula, this)
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
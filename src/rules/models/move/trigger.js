class Trigger {
	constructor(text) {
	  this.text = text
	}
}

Trigger.On = class On {
  constructor(formula) {
    super(`on ${formula}`)
    this.formula = formula
  }
}

Trigger.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.

export default Trigger
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

export default Trigger
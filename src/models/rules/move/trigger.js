class Trigger {
  constructor(text) {
    this.text = text
  }
}

Trigger.On = class On extends Trigger {
  constructor(formula) {
    super('triggered') // TODO show formula here? add toString to formula?
    this.formula = formula
  }
}

Trigger.CONSTANT = 'When you have this move' // A trigger for when an effect is constant.

export default Trigger
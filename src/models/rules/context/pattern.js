export default class Pattern {
  constructor (regex, params, options = undefined) {
    Object.assign(this, { regex, params, options })
  }
}

Pattern.Param = class PatternParam {
  constructor (name, type) {
    Object.assign(this, { name, type: type || name })
  }
}

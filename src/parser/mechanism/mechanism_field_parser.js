
// This class is a utility base class.
// Its only function is to save space in other parts of the code.
// All the parsers used in mechanism parser inherit this class, and are able to use its functions.
export default class MechanismFieldParser {
  constructor (context, presets = [], options = {}) {
    this.context = context
    this.data = [].concat(presets)
    Object.assign(this, options)
  }

  save (datum) {
    this.saveBefore ? this.data.unshift(datum) : this.data.push(datum)
    return datum
  }
}

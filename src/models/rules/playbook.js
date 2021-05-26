export default class Playbook {
  constructor (fields) {
    Object.assign(this, fields)
  }

  getValue (fieldName) {
    const field = this[fieldName]
    if (!field) {
      return undefined
    }
    
    if (field.value) {
      return field.value
    }

    if (field.formula) {
      return field.formula.getValue()
    }

    return undefined
  }
}
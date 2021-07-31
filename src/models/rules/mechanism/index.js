import merge from 'deepmerge'

export default class Mechanism {
  constructor (fields) {
    Object.assign(this, fields)
  }

  static join (...mechanisms) {
    let distinctMechanisms = mechanisms.reduce((distinctMechanismsObject, singleMechanism) => ({ ...distinctMechanismsObject, [singleMechanism.name]: singleMechanism }))
    return new Mechanism(merge.all(Object.values(distinctMechanisms)))
  }
}

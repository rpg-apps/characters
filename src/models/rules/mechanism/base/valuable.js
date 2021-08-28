export default class Valuable {
  getValue () {
    throw new Error('Cannot call method getValue on Valuable class directly')
  }
}

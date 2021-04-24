export default class Mechanic {
  constructor (name, text, playbookFields, characterFields, moveEffects) {
  	Object.assign(this, { name, text, playbookFields, characterFields, moveEffects })
  }
}
export default class Mechanic {
  constructor (name, text, globalFields, playbookFields, characterFields, moveEffects) {
    Object.assign(this, { name, text, globalFields, playbookFields, characterFields, moveEffects })
  }
}

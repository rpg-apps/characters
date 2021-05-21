export default class Mechanism {
  constructor (name, types, globalFields, playbookFields, characterFields, formulas, effects, choices) {
    Object.assign(this, { name, types, globalFields, playbookFields, characterFields, formulas, effects, choices })
  }
}

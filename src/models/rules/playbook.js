export default class Playbook {
  constructor (fields, rulebook) {
    Object.assign(this, fields, { rulebook })
  }
}


// fields = { choices, characterFields, playbookFields, globalFields, formulas }
// playbookFields are just key value
// All of which are assigned when creating it from the rulebook in the parser
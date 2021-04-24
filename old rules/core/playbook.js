/* TODO
 * Special effects in plabyooks, triggered by moves, such as "level up"
 */ 

export default class Playbook {
  constructor (props) {
    Object.assign(this, props)
  }
}

/*
Each of the mechanics is a JSON containing any of these three fields:
 - initial: An initial JSON to add to the character.
 - buildingChoices: A map of field name to the choices that go there. The choices add to the stuff already there, if they can.
 - stats: An array of stats
*/
Playbook.BuildingChoice = class PlaybookBuildingChoice {
  constructor(text, options, { count = 1, other = false, skip = false }) {
    Object.assign(this, { text, options, count, other })
  }
}

Playbook.Stat = class Stat {
  constrcutor (stat, value) {
    Object.assign(this, { stat, value })
  }
}

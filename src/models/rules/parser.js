import YAML from 'yaml'
import pluralize from 'pluralize'
import { camelCase } from 'change-case'

import Rulebook from './rulebook'
import Move from './move'
import Mechanic from './mechanic'
import Playbook from './playbook'

const RULEBOOK_FIELDS = ['moves', 'playbooks', 'mechanics']

/**
 * This function recieves an array of YAML strings representing objects in the rulebook.
 * It returns a Rulebook object with those objects.
 * Each yaml in the array requires having one - three of those fields:
 * - moves
 * - playbooks
 * - mechanics
 */
export function parse (yamls) {
  const rulebookData = RULEBOOK_FIELDS.reduce((emptyRulebook, rulebookField) => Object.assign(emptyRulebook, { [rulebookField]: [] }), { })

  const rawData = yamls.map(yaml => YAML.parse(yaml))

  rawData.forEach(datasheet => {
    RULEBOOK_FIELDS.filter(rulebookField => datasheet.hasOwnProperty(rulebookField)).forEach(rulebookField => {
      const datasheetRulebookField = datasheet[rulebookField].map(datum => {
        return recursivelyParse(pluralize.singular(rulebookField), datum)
      })
      rulebookData[rulebookField] = rulebookData[rulebookField].concat(datasheetRulebookField)
    })
  })

  return new Rulebook(rulebookData)
}

// Parses a key-value pair.
// If the value is a string, search a valid factory and if not found return as is
// If the value is not a string, parse its key-value pairs recursivly
// Then return a factory of the result if possible, and if not found return as is
function recursivelyParse (key, value) {
  if (value.constructor === String) {
    if (factories[value]) {
      console.log('factory value:', factories[value]())
      return factories[value]()
    }
    return value
  }

  if (Array.isArray(value)) {
    return value.map(subvalue => recursivelyParse(key, subvalue))
  }

  // Going over the child object and recursivly parsing it.
  const parsedValue = Object.entries(value).reduce((result, [childKey, childValue]) => {
    result[childKey] = recursivelyParse(childKey, childValue)
    if (result[childKey].independent) { result = result[childKey].independent }
    return result
  }, { })

  if (factories[key]) {
    return factories[key](parsedValue)
  }
  return parsedValue
}

Object.assign(factories, {
  playbook: value => new Playbook(value),
  mechanic: value => new Mechanic(value),
  move: value => new Move(value),
  procedure: value => new Move.Procedure(value)
})

Object.entries(Move.Procedure).filter(([key]) => !['Effect', 'BasicEffect'].includes(key)).forEach(([key, factory]) => {
  factories[camelCase(key)] = (value) => (value ? { independent: new Move.Procedure[key](value) } : new Move.Procedure[key]({ }))
})
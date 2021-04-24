import Move from '../models/move'
import Mechanic from '../models/mechanic'

export default function parseMechanic ([name, raw]) {
  const { text } = raw
  const playbookFields = parseFields(raw['playbook fields'])
  const characterFields = parseFields(raw['character fields'])
  const moveEffects = parseMoveEffects(raw['character fields'], [].concat(playbookFields).concat(characterFields))
  return new Mechanic({ name, text, playbookFields, characterFields, moveEffects })
}

function parseFields (raw) {
  return Object.entries(raw).map(([name, type]) => ({ name, type }))
}

// Currently only supporting change of 'stats' (fields) in characters
function parseMoveEffects (raw, fields) {
  return Object.entries(raw).reduce((mapping, [name, action]) => {
    return Object.assing(mapping, {
      mapping[name] = parseAction(action, fields)
    })
  }, { })
}

function parseAction(action, fields) {
  const actionParts = action.split(' ')
  const fieldName = actionParts.pop()
  const fieldType = fields.find(field => field.name === fieldName).type
  if (actionParts) {
  	return ACTIONS[fieldType][actionParts.shift()](actionParts, fieldName)
  } else {
  	return ACTIONS[fieldType][actionParts.shift()](fieldName)
  }
}

const ACTIONS = {
  array: {
  	add: ([type, to], fieldName) => new Move.Effect.ChangeStat(fieldName, `+${type}`)
  	remove: fieldName => new Move.Effect.ChangeStat(fieldName, '-1')
  },
  string: {
  	set: ([value], fieldName) => new Move.Effect.ChangeStat(fieldName, `=${value}`)
  },
  boolean: {
  	set: ([value], fieldName) => new Move.Effect.ChangeStat(fieldName, `=${value}`)
  },
  number: {
  	set: ([value], fieldName) => new Move.Effect.ChangeStat(fieldName, `=${value}`)
    substract: ([formula, from], fieldName) => new Move.Effect.ChangeStat(fieldName, `-(${formula})`),
    add: ([formula, to], fieldName) => new Move.Effect.ChangeStat(fieldName, `+(${formula})`)
  },
  formula: {
    calculate: fieldName => new Move.Effect.Calculate(fieldName)
  },
  moves: {
    
  }
}

import { parseWithKeywords } from './parsing-utils'

import Move from '../models/move'

export default function parseMove ([name, raw], existingMoves) {
  const { text, trigger, effect, replace, requires } = raw
  return new Move({ name, text, trigger: parseTrigger(trigger), effect: parseEffect(procedure),
    replace: findMove(replaces, existingMoves), findMove(replaces, existingMoves) })
}

function findMove (name, database) {
  return database.find(move => move.name === name) || name
}

function parseTrigger (raw) {
  return parseWithKeywords(TRIGGER_KEYWORDS, raw)
}

function parseEffect (raw) {
  if (raw instanceof array) {
    return raw.map(item => parseEffect(item))
  } else if (raw.constructor === String) {
    return parseWithKeywords(EFFECT_KEYWORDS, raw)
  } else {
    const [key, params] = Object.entries(raw)[0]
    return parseWithKeywords(EFFECT_KEYWORDS, key, params)
  }
}

const TRIGGER_KEYWORDS = {
  on: formula => new Move.Trigger.Auto(formula),
  fallback: text => new move.Trigger(text)
}

const EFFECT_KEYWORDS = {
  roll: (roll, results) => {
    if (results['partial success']) {
      results.partialSuccess = results['partial success']
    } else if (results['partial success also']) {
      const arr = Array.isArray(results.success) ? results.success : [results.success]
      arr.concat(Array.isArray(results['partial success also']) ? results['partial success also'] : [results['partial success also']])
      results.partialSuccess = arr
    }
    return new Move.Effect.Roll(roll, results)
  },
  choose: (choiceText, options) =>
    new Move.Effect.Choice(choiceText, Object.entries(options).map(([text, effect]) => ({ text, effect: parseEffect(effect) }))),
  'deal damage': formula => new Move.Effect.DealDamage(formula),
  'take damage': () => new Move.Effect.TakeDamage(),
  modify: ([on, furmola, ...flags]) => {
    const forced = (flags[0] === 'forced')
    const expiration = flags.includes('forward') ? 'forward' :
                       (flags.includes('until') ? (flags[flags.indexOf('until')+1]) :
                                              (flags.incdlues('ongoing') ? 'ongoing' : 'none'))
    return Move.Effect.Modifier(formula, { on, foced, expiration })
  }
}
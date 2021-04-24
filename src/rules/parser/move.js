import { parseWithKeywords } from './parsing-utils'

import Move from '../models/move'

const _state = { }

export default function parseMove ([name, raw], existingMoves) {
  const { text, trigger, effect, replace, requires } = raw
  return new Move({ name, text, trigger: parseTrigger(trigger), effect: parseEffect(procedure),
    replace: findMove(replaces, existingMoves), requires: findMove(replaces, existingMoves) })
}

function findMove (name, database) {
  return database.find(move => move.name === name) || name
}

function parseTrigger (raw) {
  return parseWithKeywords(TRIGGER_KEYWORDS, raw)
}

function parseEffect (raw) {
  if (raw instanceof array) {
    return raw.map(item => parseEffect(item)).filter(effect => Boolean(effect))
  } else if (raw.constructor === String) {
    return parseWithKeywords(EFFECT_KEYWORDS, raw)
  } else {
    const [key, params] = Object.entries(raw)[0]
    return parseWithKeywords(EFFECT_KEYWORDS, key, params)
  }
}

const TRIGGER_KEYWORDS = {
  on: formula => new Move.Trigger.Auto(formula),
  fallback: text => new Move.Trigger(text),
  constant: () => Move.Trigger.CONSTANT
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
  choose: (choiceText, options) => {
    const count = (choiceText[0].match(/^\d+$/)) ? Number(choiceText.shift().match(/^\d+$/)) : 1
    choiceText = choiceText.join(' ')
    if (options) {
      return new Move.Effect.Choice(choiceText, Object.entries(options).map(([text, effect]) => ({ text, effect: parseEffect(effect) })), count)
    } else {
      _state.effect = new Move.Effect.Choice(choiceText, [], count) 
      return _state.effect
    }
  },
  'deal damage': formula => new Move.Effect.DealDamage(formula),
  'take damage': () => new Move.Effect.TakeDamage(),
  modify: ([on, furmola, ...flags], options) => {
    const forced = (flags[0] === 'forced')
    const expiration = flags.includes('forward') ? 'forward' :
                       (flags.includes('until') ? (flags[flags.indexOf('until')+1]) :
                                              (flags.incdlues('ongoing') ? 'ongoing' : 'none'))

    Object.entries(options).forEach(([key, value]) => { options[key] = parseEffect(value) })
    return Move.Effect.Modifier(formula, Object.assign(options, { on, foced, expiration }))
  },
  'use gear': (flags) => {
    const amount = Number(flags.find(flag => flag.match(/^\d+$/)).match(/^\d+$/) || '1')
    const requirement = undefined
    if (flags.includes('with') && flags.includes('tag')) {
      requirements = { type: 'tag', tag: flags[flags.indexOf('tag') + 1] }
    } else {
      requirements = flags[flags.length - 1]
    }
    return new Move.Effect.UseGear({ requirements, amount })
  },
  hold: ([count], options) => {
    if (options) {
      return new Move.Effect.Hold({
        count,
        options: Object.entries(options).reduce((opts, [key, value]) => Object.assign(opts, { [key]: parseEffect(value) }), {})
      })
    } else {
      _state.effect = new Move.Effect.Hold({ count, options: {} })
      return _state.effect
    }
  },
  use: options => {
    if (_state.effect && _state.effect.setUsageOptions) {
      _state.effect.setUsageOptions(Object.entries(options).reduce((opts, [key, value]) => Object.assign(opts, { [key]: parseEffect(value) }), {}))
      delete _state.effect
    }
    return null
  },
  'no effect': () => Move.Effect.NO_EFFECT,
  'change stat': ([stat, change]) => new Move.Effect.ChangeStat(stat, change),
  die: () => new Move.Effect.Die(),
  is: ([condition], { yes, no }) => new Move.Effect.Condition(condition, parseEffect(yes), parseEffect(no)),
  'trigger move': (moveName) => new Move.Effect.TriggerMove(moveName),
  'add advanced move': () => new Move.Effect.AddAdvancedMove()
}
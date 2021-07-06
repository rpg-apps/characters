import Move from '../models/rules/move'

import { parseFields, getFlag } from './parsing-utils'

export default function parseMove (name, rawMove, context) {
  return new Move({ ...parseFields(rawMove, PARSERS, context), name })
}

const PARSERS = {
  text: text => text,
  trigger: (trigger, { formulaParser }) => {
    let automatic
    [automatic, trigger] = getFlag(trigger, AUTOMATIC_TRIGGER_PREFIX)
    if (automatic) {
      return new Move.Trigger.On(formulaParser.parseUsage(trigger))
    } else {
      return new Move.Trigger(trigger)
    }
  },
  effect: (effect, { effectParser }) => effectParser.parseUsage(effect)
}

const AUTOMATIC_TRIGGER_PREFIX = 'on'
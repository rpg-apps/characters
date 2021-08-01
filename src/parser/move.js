import Move from '../models/rules/move'

import { parseFields, getFlag } from './parsing-utils'

export default function parseMove (name, rawMove) {
  return new Move({ ...parseFields(rawMove, PARSERS), name })
}

const PARSERS = {
  text: text => text,
  trigger: trigger => {
    let automatic
    [automatic, trigger] = getFlag(trigger, AUTOMATIC_TRIGGER_PREFIX)
    if (automatic) {
      return new Move.Trigger.On(trigger)
    } else {
      return new Move.Trigger(trigger)
    }
  },
  effect: effect => effect
}

const AUTOMATIC_TRIGGER_PREFIX = 'on'

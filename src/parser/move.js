import Move from '../models/rules/move'

import { parseFields, Flag } from './parsing-utils'

export default function parseMove (name, rawMove) {
  return new Move({ ...parseFields(rawMove, PARSERS), name })
}

const PARSERS = {
  text: text => text,
  type: type => type,
  trigger: trigger => {
    return AUTOMATIC_TRIGGER_FLAG.execute(trigger, {
      onTrue: automaticTrigger => new Move.Trigger.On(automaticTrigger),
      onFalse: () => new Move.Trigger(trigger)
    })
  },
  effect: effect => effect
}

const AUTOMATIC_TRIGGER_FLAG = new Flag.Prefix('on')

import Move from '../models/move'

import { parseWithKeywords, parseFields, getFlag } from './parsing-utils'

export default parseMove (name, rawMechanism, context) {
  const fields = parseFields(rawMechanism, PARSERS, context)
  fields.name = name
  return new Move(fields)
}

const PARSERS = {
  text: text => text,
  trigger: (trigger, { formulaParser }) => {
    const [automatic, trigger] = getFlag(trigger, AUTOMATIC_TRIGGER_PREFIX)
    if (automatic) {
      return new Move.Trigger.On(formulaParser.parseUsage(trigger))
    } else {
      return new Move.Trigger(trigger)
    }
  },
  effect: (effect, { effectParser }) => effectParser.parseUsage(effect)
}

const AUTOMATIC_TRIGGER_PREFIX = 'on '
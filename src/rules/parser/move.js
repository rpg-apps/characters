import Move from '../models/move'

import { parseWithKeywords, parseFields } from './parsing-utils'

export default parseMechanism (name, rawMechanism, context) {
  const fields = parseFields(rawMechanism, PARSERS, context)
  fields.name = name
  return new Move(fields)
}

const PARSERS = {
  text: text => text,
  trigger: (trigger, { formulaParser }) => {
    return parseWithKeywords({
      on: 
    }, null, trigger => new Move.Trigger(trigger))
    const automatic = trigger.startsWith(AUTOMATIC_TRIGGER_PREFIX)
    if (automatic) {
      return new Move.Trigger.On(formulaParser.parseUsage(trigger.replace(AUTOMATIC_TRIGGER_PREFIX, '')))
    } else {
      return 
    }
  },
  effect: (effect, { effectParser }) => effectParser.parseUsage(effect)
}

const AUTOMATIC_TRIGGER_PREFIX = 'on '
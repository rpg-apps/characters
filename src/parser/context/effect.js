import Effect from '../../models/rules/move/effect'

import { PatternParser } from '../parsing-utils'

export default class EffectParser {
  constructor(context) {
    this.context = context
    this.patternParser = new PatternParser()
    this.parsers = [].concat(PRESET_PARSERS)
  }

  // When defining an effecct using the 'effects' field
  parseDefinition (pattern, definition) {
    const matchParams = this.patternParser.paramNames({ pattern })
    definition = this.parseUsage(definition, matchParams)
    const parser = { pattern, getEffect: params => definition.getEffect(params) }
    this.parsers.push(parser)
    return parser
  }

  // When using an effect in another effect or in an 'effect' field
  parseUsage (rawEffect, params=[]) {
    if (Array.isArray(rawEffect)) {
      return rawEffect.map(rawItem => this.parseUsage(rawItem, params))
    }

    const parser = this.parsers.find(({ pattern }) => this.patternParser.matching({ pattern }, rawEffect))
    if (!parser) {
      return { pattern: '', getEffect: () => new Effect.Text(rawEffect) }
    }

    params = this.patternParser.getParams(parser, rawEffect, params, (raw, { type, params }) => {
      if (type === 'options') {
        if (Array.isArray(raw)) {
          return raw.map(rawItem => this.parseUsage(rawItem, params))
        }        
        Object.entries(raw).forEach(([key, value]) => { raw[key] = this.parseUsage(value, params) })
        return raw
      } else if (type === 'field') {
        return this.context.fieldParser.allFields().find(field => field.name === raw)
      } else if (type) {
        return this.context.typeParser.parseValue(raw, type, params)
      } else {
        return raw
      }
    })
    return parser.getEffect(params, this.context)
  }
}

const PRESET_PARSERS = [
  { pattern: 'show <something>', getEffect: ({ something }) => new Effect.Text(something) },

  { pattern: 'add <formula:formula> to <field:field>', getEffect: ({ field, formula }) => new Effect.Change(field, 'array.add', formula) },
  { pattern: 'remove <formula:formula> from <field:field>', getEffect: ({ field, formula }) => new Effect.Change(field, 'array.remove', formula) },
  { pattern: 'set <formula:formula> = <field:field>', getEffect: ({ field, formula }) => new Effect.Change(field, 'set', formula) },
  { pattern: 'change <field:field> <formula:formula>', getEffect: ({ field, formula }) => new Effect.Change(field, 'change', formula) },

  { pattern: 'modify <string:filter> <formula:formula>', getEffect: ({ filter, formula, once }) => new Effect.Modify(filter, formula) },
  { pattern: 'modify once <string:filter> <formula:formula>', getEffect: ({ filter, formula, once }) => new Effect.Modify(filter, formula, { once: true }) },
  
  { pattern: 'roll <formula:formula> {outcomes}', getEffect: ({ formula, outcomes }) => new Effect.Roll(formula, outcomes) },

  { pattern: 'choose <string:text> {choices}', getEffect: ({ text, outcomes }) => new Effect.Choice(text, outcomes) },
  { pattern: 'choose <number:count> <string:text> {choices}', getEffect: ({ text, count, outcomes }) => new Effect.Choice(text, outcomes, count) },
  { pattern: 'choose <number:count> {choices}', getEffect: ({ count, outcomes }) => new Effect.Choice('', outcomes, count) },
  { pattern: 'choose <string:text>', getEffect: ({ text }) => new Effect.Choice(text) },
  { pattern: 'choose <number:count> <string:text>', getEffect: ({ text, count }) => new Effect.Choice(text, count) },
  { pattern: 'choose <number:count>', getEffect: ({ count }) => new Effect.Choice('', { }, count) },
  { pattern: 'options {outcomes}', getEffect: ({ outcomes }, context) => {
    const choice = context.effectParser.getLast(Effect.Choice)
    choice.outcomes = outcomes
    return null
  } },
  
  { pattern: 'is <formula:condition> {outcomes}', getEffect: ({ condition, outcomes }) => new Effect.Condition(condition, outcomes) },
  { pattern: 'repeat <number:count> times {effect}', getEffect: ({ count, effect }) => new Array(count).fill(effect) },
  
  { pattern: 'trigger move: <moveName:move>', getEffect: ({ move }) => new Effect.TriggerMove(move) }
]

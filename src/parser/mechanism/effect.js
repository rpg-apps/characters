import Effect from '../../models/rules/mechanism/effect'

export default class EffectParser {
  constructor(context) {
    this.context = context
    this.effects = [].concat(Effect.PRESETS)
  }

  parseDefinition (pattern, definition) {
    const effect = new Effect.ComplexEffect(pattern, definition)
    this.effects.unshift(effect)
    return effect
  }
}

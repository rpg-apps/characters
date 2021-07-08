import Effect from '../../models/rules/mechanism/effect'

export default class EffectParser {
  constructor(context) {
    this.context = context
    this.effects = [].concat(Effect.PRESETS)
  }

  // When defining an effecct using the 'effects' field
  parseDefinition (pattern, definition) {
    const effectCall = this.parseUsage(definition)
    const effect = new Effect.ComplexEffect(pattern, effectCall)
    this.effects.push(effect)
    return effect
  }

  // When using an effect in another effect or in an 'effect' field
  parseUsage (raw) {
    const effect = this.effects.find(effect => effect.match(raw))
    if (!effect) return raw

    const params = effect.pattern.extract(raw)
    return new Effect.Call(effect, params)
  }
}

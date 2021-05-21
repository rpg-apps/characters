export default class EffectParser {
  constructor(effects) {
    this.effects = [].concat(effects)
  }

  // When defining an effecct using the 'effects' or 'effect' field
  parseDefinition (rawEffect) {
    const effect = undefined
    this.effects.push(effect)
    return effect
  }

  // When using an effect in another effect
  parseUsage (rawEffect) {
    const effect = undefined
    return effect
  }
}

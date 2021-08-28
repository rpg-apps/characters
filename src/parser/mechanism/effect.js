import MechanismFieldParser from './mechanism_field_parser'
import Effect from '../../models/rules/mechanism/effect'

export default class EffectParser extends MechanismFieldParser {
  constructor(context) {
    super(context, Effect.PRESETS, { saveBefore: true })
  }

  parseDefinition (pattern, definition) {
    const effect = new Effect.ComplexEffect(pattern, definition)
    return this.save(effect)
  }
}

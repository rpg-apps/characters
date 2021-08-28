import Valuable from './base/valuable'
import Pattern from './base/pattern'

export default class Effect {
  constructor (pattern) {
    this.pattern = (pattern instanceof Pattern) ? pattern : new Pattern(pattern)
  }

  match (raw) {
    return this.pattern.match(raw)
  }

  execute () {
    throw new Error('execute should not be called on Effect class directly')
  }
}

Effect.PresetEffect = class PresetEffect extends Effect {
  constructor (pattern, execute) {
    super(pattern)
    this.execute = execute
  }
}

Effect.ComplexEffect = class ComplexEffect extends Effect {
  constructor (pattern, effectCall) {
    super(pattern)
    this.effectCall = effectCall
  }

  execute (params, executioner, character) {
    return this.effectCall.execute(params, executioner, character)
  }
}

Effect.Modifier = class Modifier {
  constructor ({ filter, value, once=false }) {
    Object.assign(this, { filter, value, once })
  }
}

Effect.PRESETS = [
  new Effect('show <string:something>', ({ something }, { executioner }) => executioner.output(something)),

  new Effect('add <formula:value> to <field:field>', ({ field, value }, { character }) => character.fields[field].push(value)),
  new Effect('remove <formula:value> from <field:field>', ({ field, value }, { character }) => character.fields[field].value.splice(field.value.indexOf(value))),
  new Effect('set <formula:value> = <field:field>', ({ field, value }, { character }) => { character.fields[field].value = value }),
  new Effect('change <field:field> by <formula:value>', ({ field, value }, { character }) => { character.fields[field].value += value }),

  new Effect('modify <string:filter> <formula:value>', ({ filter, value }, { character }) => { character.modifiers.push({ filter, value }) }),
  new Effect('modify once <string:filter> <formula:value>', ({ filter, value }, { character }) => { character.modifiers.push({ filter, value, once: true }) }),

  new Effect('roll <formula:value> {outcomes}', ({ value, outcomes }, { executioner, character }) => {
    Object.entries(outcomes)
      .filter(([range]) => range === value || (range.start <= value && range.end >= value))
      .forEach(([range, outcome]) => outcome.execute(character, executioner))
  }),

  new Effect('choose <string:text> {choices}', async ({ text, choices }, { executioner, character }) => {
    const selection = await executioner.input(text, { options: Object.keys(choices) })
    choices[selection].execute(character, executioner)
  }),
  new Effect('choose <number:count> <string:text> {choices}', async ({ text, count, choices }, { executioner, character }) => {
    const selection = await executioner.input(text, { options: Object.keys(choices), allow: count })
    choices[selection].forEach(effect => effect.execute(character, executioner))
  }),
  new Effect('choose <number:count> {choices}', async ({ count, choices }, { executioner, character }) => {
    const selection = await executioner.input('Choose', { options: Object.keys(choices), allow: count })
    choices[selection].forEach(effect => effect.execute(character, executioner))
  }),
  new Effect('choose {choices}', async ({ choices }, { executioner, character }) => {
    const selection = await executioner.input('Choose', { options: Object.keys(choices) })
    choices[selection].execute(character, executioner)
  }),
  new Effect('choose <string:text>', async ({ text }, { executioner, character }) => {
    Object.assgin(character.history.last(), { text })
  }),
  new Effect('choose <number:count> <string:text>', async ({ text, count }, { executioner, character }) => {
    Object.assgin(character.history.last(), { text, count })
  }),
  new Effect('choose <number:count>', ({ count }, { executioner, character }) => {
    Object.assgin(character.history.last(), { count })
  }),
  
  new Effect('options {choices}', async ({ choices }, { executioner, character }) => {
    const originalChoiceDecleration = character.history.last(event => (event instanceof Effect.Call && event.effect.pattern.raw.startsWith('choose')))
    const text = originalChoiceDecleration.text
    const count = originalChoiceDecleration.count
    const selections = await executioner.input(text, { options: Object.keys(choices), allow: count })
    selections.forEach(selection => choices[selection].execute(character, executioner))
  }),
  
  new Effect('is <formula:condition> {outcomes}', ({ condition, outcomes }, { executioner, character }) => {
    const effect = condition ? outcomes.yes : outcomes.no
    effect.execute(character, executioner) 
  }),

  new Effect('repeat <number:count> times {effect}', async ({ count, effect }, { executioner, character }) => {
    for (let i = 0; i < count; i++) {
      effect.execute(character, executioner)
    }
  }),

  new Effect('trigger move: <string:move>', async ({ move }, { executioner, character }) => {
    character.trigger(move, executioner)
  })
]

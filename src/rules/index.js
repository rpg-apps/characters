import * as parser from './parser'

export class Rulebook {
  constructor ({ mechanisms, moves, playbooks }) {
    Object.assign(this, { mechanisms, moves, playbooks })
  }

  static parse (yamls) {
    return new Rulebook(parser.parse(yamls))
  }
}

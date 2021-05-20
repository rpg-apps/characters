import * as parser from './parser'

export class Playbook {
  constructor ({ moves, playbooks, mechanics, equipment }) {
    Object.assign(this, { moves, playbooks, mechanics, equipment })
  }

  extend (playbook) {
    ['moves', 'playbooks', 'mechanics', 'equipment'].forEach(field => {
      Object.assign(this[field], playbook[field])
      Object.keys(this[field])
        .filter(key => this[field][key] === 'irelevant')
        .forEach(key => delete this[field][key])
    })
  }

  static parse (yamls) {
    return new Playbook(parser.parse(yamls))
  }
}

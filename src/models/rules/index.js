export default class Rulebook {
  constructor (rules) {
    Object.assign(this, rules)
    
    this.playbooks.forEach(playbook => { playbook.rulebook = this })
  }
}

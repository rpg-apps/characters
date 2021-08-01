import Playbook from './playbook'

export default class Rulebook {
  constructor (mechanisms, moves) {
    Object.assign(this, { mechanisms, moves })
    this.playbooks = []
  }
}

export default class Rulebook {
  constructor ({ mechanisms, moves, playbooks, context }) {
    Object.assign(this, { mechanisms, moves, playbooks, context })
  }
}

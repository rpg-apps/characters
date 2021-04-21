import barbarian   from './playbooks/barbarian'
import bard     from './playbooks/bard'
import cleric    from './playbooks/cleric'
import druid    from './playbooks/druid'
import fighter    from './playbooks/fighter'
import immolator   from './playbooks/immolator'
import paladin     from './playbooks/paladin'
import ranger     from './playbooks/ranger'
import thief     from './playbooks/thief'
import wizard     from './playbooks/wizard'

import defaultMoves from './moves/**'
import defaultMechanics from './mechanics/**'

const defaultPlaybooks = { barbarian, bard, cleric, druid, fighter, immolator, paladin, ranger, thief, wizard }

class Rulebook {
  constructor({ playbooks, moves, mechanics }) {
    Object.assign(this, playbooks, moves, mechanics)
  }
}

Rulebook.default = new Rulebook({ playbooks: defaultPlaybooks, moves: defaultMoves, mechanics: defaultMechanics })

// TODO add ability to replace a mechanic. For instance, flags replace bonds.
Rulebook.extension = ({ newPlaybooks, newMoves, newMechanics }) => {
  const playbooks = Object.assign({}. Rulebook.default.playbooks, newPlaybooks)
  const moves = Object.assign({}, Rulebook.default.moves, newMoves)
  const mechanics = Object.assign({}, Rulebook.default.mechanics, newMechanics)
  return new Rulebook({ playbooks, moves, mechanics })
}

export default Rulebook
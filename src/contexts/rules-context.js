import { createContext } from 'react'

import { parse } from '../parser'
import core from '../rules/core.yaml'

const rulebook = parse([core])

const RulesContext = createContext(rulebook)
export default RulesContext
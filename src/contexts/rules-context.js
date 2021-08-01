import { createContext } from 'react'

import parse from '../parser'
import core from '../rules/core.yaml'

const rulebook = parse([core])
console.log(rulebook)

const RulesContext = createContext(rulebook)
export default RulesContext

import Mechanism from '../models/rules/mechanism'

import { parseFields } from './parsing-utils'

export default function parseMechanism (name, rawMechanism, context) {
  return new Mechanism({ ...parseFields(rawMechanism, PARSERS, context), name })
}

const collectionObjectParser = (name, method = 'parseDefinition') => {
  return (collection, context) => {
    const parser = context[`${name}Parser`]
    return Object.entries(collection).map(([key, value]) => parser[method](key, value))
  }
}

const PARSERS = {
  types: collectionObjectParser('type'),
  formulas: collectionObjectParser('formula'),
  globalFields: collectionObjectParser('field', 'parseGlobalFieldDefinition'),
  playbookFields: collectionObjectParser('field', 'parsePlaybookFieldDefinition'),
  choices: collectionObjectParser('choice'),
  characterFields: collectionObjectParser('field', 'parseCharacterFieldDefinition'),
  effects: collectionObjectParser('effect'),
}

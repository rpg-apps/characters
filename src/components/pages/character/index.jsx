import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { noCase } from 'change-case'

import '../../../css/pages/character.scss'

import CharacterSettings from './settings'
import { useCharacters } from '../../contexts/characters-context'
import useForceUpdate from '../../contexts/force-update'
import Character from '../../presentation/character'

Modal.setAppElement('#root')

export default function CharacterPage ({ match }) {
  const [focus, setFocus] = useState(false)
  const [handlers, setHandlers] = useState({})
  const forceUpdate = useForceUpdate()
  const character = useCharacters().find(character => character.id.toString() === match.params.id)

  useEffect(() => refreshHandlers(), [])

  const handleEvent = async ({ name, value }, event) => {
    const eventType = noCase(event._reactName?.substr(2) || `${event.action}${event.dir}`)
    if (handlers?.[name]?.[eventType]) {
      const handler = handlers?.[name]?.[eventType]
     const procedure = (handler instanceof Function) ? handler(event) : handler
      await character.execute(procedure, { output, input, choose, edit })
      forceUpdate()
      await character.save()
    }
  }

  const refreshHandlers = () => {
    setHandlers(character.adapters.reduce((results, adapter) => ({ ...results, ...adapter.getHandlers(character.calculatedSettings || {}) }), {}))
  }

  const output = text => {
    setFocus(text)
  }

  const input = (text, type = 'string') => {

  }

  const choose = (text, options, count = 1) => {

  }

  const edit = fieldName => {
    const field = character.playbook.rules.characterFields.find(characterField => characterField.name === fieldName)
    console.log('editing', field)
  }

  return <div className='character page'>
    <Character character={character} handleEvent={handleEvent}>
      <CharacterSettings onChange={() => refreshHandlers()} character={character} />
      <Modal isOpen={Boolean(focus)} onRequestClose={() => setFocus(false)}>{focus}</Modal>
    </Character>
  </div>
}

import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { noCase } from 'change-case'
import { FaArrowLeft, FaScroll } from 'react-icons/fa'

import '../../../css/pages/character.scss'

import CharacterSettings from './settings'
import { useCharacters } from '../../contexts/characters-context'
import useForceUpdate from '../../contexts/force-update'
import Character from '../../presentation/character'
import Loader from '../../presentation/loader'

Modal.setAppElement('#root')

export default function CharacterPage ({ match }) {
  const [focusing, setFocusing] = useState(false)
  const [focus, setFocus] = useState(false)
  const [handlers, setHandlers] = useState({})
  const forceUpdate = useForceUpdate()
  const character = useCharacters().find(character => character.id.toString() === match.params.id)

  const handleEvent = async ({ name, value }, event) => {
    const eventType = noCase(event._reactName?.substr(2) || `${event.action}${event.dir}`)
    console.log(eventType, name, handlers?.[name]?.[eventType])
    if (handlers?.[name]?.[eventType]) {
      const handler = handlers?.[name]?.[eventType]
     const procedure = (handler instanceof Function) ? handler(event) : handler
      await character.execute(procedure, { output, input, choose, edit })
      forceUpdate()
      await character.save()
    }
  }

  const refreshHandlers = useCallback(() => {
    setHandlers(character.adapters.reduce((results, adapter) => ({ ...results, ...adapter.getHandlers(character.calculatedSettings || {}) }), {}))
  }, [character])

  const output = text => {
    setFocus(text)
    setFocusing(true)
  }

  const input = (text, type = 'string') => {

  }

  const choose = (text, options, count = 1) => {

  }

  const edit = fieldName => {
    const field = character.playbook.rules.characterFields.find(characterField => characterField.name === fieldName)
    console.log(`editing ${fieldName}`)
  }

  useEffect(() => {
    if (character) {
      refreshHandlers()
    }
  }, [character, refreshHandlers])

  if (!character) {
    return <Loader />
  }

  return <div className='character page'>
    <Character character={character} handleEvent={handleEvent}>
      <CharacterSettings onChange={() => refreshHandlers()} character={character} />
      <Link className='back link' to='/'><FaArrowLeft /></Link>
      <div className='notes' onClick={() => output(character.notes)}><FaScroll /></div>
      <Modal isOpen={focusing} onRequestClose={() => setFocusing(false)}>{focus}</Modal>
    </Character>
  </div>
}

import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-modal'
import { FaArrowLeft, FaScroll } from 'react-icons/fa'

import '../../../css/pages/character.scss'

import CharacterSettings from './settings'
import { useCharacters } from '../../contexts/characters-context'
import { useForceUpdate } from '../../hooks/force-update'
import { useProdcedureUI } from '../../hooks/procedure-ui'
import Character from '../../presentation/character'
import Loader from '../../presentation/loader'

Modal.setAppElement('#root')

export default function CharacterPage ({ match }) {
  const [handlers, setHandlers] = useState({})
  const forceUpdate = useForceUpdate()
  const character = useCharacters().find(character => character.id.toString() === match.params.id)
  const ui = useProdcedureUI(character)

  const handleEvent = async ({ name, value }, eventType, event) => {
    const handler = Object.entries(handlers).find(([key, handler]) => Boolean(new RegExp(`^${key}$`).exec(name)))?.[1]?.[eventType]
    if (handler) {
      const procedure = (handler instanceof Function) ? handler(event, value) : handler
      if (procedure.constructor === String && procedure.startsWith('edit')) {
        const [fieldName, type] = procedure.replace('edit ', '').split(' as ').map(x => x.trim())
        ui.edit(fieldName, type)
      } else {
        await character.execute(procedure, ui)
      }
      forceUpdate()
      await character.save()
    }
  }

  const editNotes = async () => {
    character.notes = await ui.input('notes', 'long text', { status: 'edit notes', initialValue: character.notes })
    await character.save()
  }

  const refreshHandlers = useCallback(() => {
    setHandlers(character.adapters.reduce((results, adapter) => ({ ...results, ...adapter.getHandlers(character.calculatedSettings || {}) }), {}))
  }, [character])

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
      <div className='notes' onClick={() => editNotes()}><FaScroll /></div>
      <Modal isOpen={Boolean(ui.status)} onRequestClose={ui.exit} className={Character.classes(character)}>
        {(ui.content instanceof Function) ? ui.content() : ui.content }
      </Modal>
    </Character>
  </div>
}

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
import Input from '../../presentation/input'

Modal.setAppElement('#root')

export default function CharacterPage ({ match }) {
  const [handlers, setHandlers] = useState({})
  const [modal, setModal] = useState({ status: false })
  const forceUpdate = useForceUpdate()
  const character = useCharacters().find(character => character.id.toString() === match.params.id)

  const handleEvent = async ({ name, value }, event) => {
    const eventType = noCase(event._reactName?.substr(2) || `${event.action}${event.dir}`)
    const handler = Object.entries(handlers).find(([key, handler]) => Boolean(new RegExp(`^${key}$`).exec(name)))?.[1]?.[eventType]
    if (handler) {
      const procedure = (handler instanceof Function) ? handler(event, value) : handler
      console.log(procedure)
      await character.execute(procedure, { output, input, choose, edit })
      forceUpdate()
      await character.save()
    }
  }

  const refreshHandlers = useCallback(() => {
    setHandlers(character.adapters.reduce((results, adapter) => ({ ...results, ...adapter.getHandlers(character.calculatedSettings || {}) }), {}))
  }, [character])


  const output = text => {
    console.log(text)
    setModal({ status: 'output' })
  }

  const input = async (title, type = 'text') => {
    return new Promise(resolve => {
      _prompt({ status: 'input', title, type, get: () => '', set: value => resolve(value) })
    })
  }

  const choose = async (title, options, count = 1) => {
    // TODO add choice with options
  }

  const edit = async fieldName => {
    await _prompt({
      status: 'edit',
      title: fieldName,
      type: 'text',
      get: async () => await character.get(fieldName, { ui: this }),
      set: async value => await character.set(fieldName, value)
    })
  }

  const editNotes = async () => {
    await _prompt({
      status: 'edit',
      title: 'notes',
      type: 'long text',
      get: async () => character.notes,
      set: value => { character.notes = value }
    })
  }

  const _prompt = async ({ status, title, type, get, set }) => {
    const calculatedType = character.playbook.rules.types.find(t => t.name && t.fieldTypes)?.fieldTypes || type
    const onChange = async value => {
      await set(value)
      setModal({ status, title, content, value })
    }
    const save = async () => {
      await character.save()
      setModal({ status: false })
    }
    const value = await get()
    const content = () => [
      <Input type={calculatedType} value={modal.value || value} onChange={onChange} />,
      <div className='primary button' onClick={save}>done</div>
    ]
    onChange(value)
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
      <div className='notes' onClick={() => editNotes()}><FaScroll /></div>
      <Modal isOpen={Boolean(modal.status)} onRequestClose={() => setModal({ status: false })}>
        <div className={modal.status}>
          <div className='title'>{modal.title}</div>
          {modal.content ? modal.content() : ''}
        </div>
      </Modal>
    </Character>
  </div>
}

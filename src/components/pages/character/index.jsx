import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { noCase } from 'change-case'

import CharacterSettings from './settings'
import { useCharacters } from '../../contexts/characters-context'
import useForceUpdate from '../../contexts/force-update'
import Character from '../../presentation/character'
import { adapters } from '../../../games'

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
      await character.execute(procedure, { output, input, choose })
      forceUpdate()
      await character.save()
    }
  }

  const refreshHandlers = async () => {
    const newHandlers = character.rulebooks.reduce((results, rulebook) => {
      const [game, rules] = rulebook.split(' ')
      return { ...results, ...adapters[game][rules].getHandlers(character.settings) }
    }, { })
    setHandlers(newHandlers)
  }

  const settings = () => {
    return character.rulebooks.reduce((results, rulebook) => {
      const [game, rules] = rulebook.split(' ')
      return { ...results, ...adapters[game][rules].settings }
    }, { })
  }

  const output = text => {
    setFocus(text)
  }

  const input = (text, type = 'string') => {

  }

  const choose = (text, options, count = 1) => {

  }

  return <div className='character page'>
    <Character character={character} handleEvent={handleEvent}>
      <CharacterSettings settings={settings()} value={character.settings} onChange={() => refreshHandlers()} character={character} />
      <Modal isOpen={Boolean(focus)} onRequestClose={() => setFocus(false)}>{focus}</Modal>
    </Character>
  </div>
}

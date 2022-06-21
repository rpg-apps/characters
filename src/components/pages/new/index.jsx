import React, { useState } from 'react'
import { useHistory } from 'react-router'

import '../../../css/pages/new.scss'

import { useRules } from '../../contexts/rules-context'
import { useCharacters } from '../../contexts/characters-context'
import { useProdcedureUI } from '../../hooks/procedure-ui'
import OptionsChoice from './options-choice'
import Loader from '../../presentation/loader'
import { SUPPORTED_RULEBOOKS } from '../../../games'
import Choice from './choice'

// TODO add UI for post-character-creation choices.
export default function New () {
  const rules = useRules()
  const history = useHistory()
  const characters = useCharacters()

  const [loading, setLoading] = useState(false)
  const [builder, setBuilder] = useState()
  const [choice, setChoice] = useState()

  const ui = useProdcedureUI(() => builder.character)

  const initializeBuilder = async rulebook => {
    setBuilder((await rules.get([rulebook])).characters.builder)
  }

  const start = playbook => {
    builder.start(playbook)
    builder.character.save = () => {}
    setChoice(builder.choice)
  }

  const update = value => {
    builder.choose(value)
    if (builder.choice) {
      setChoice(builder.choice)
    } else {
      finish()
    }
  }

  const finish = async () => {
    setLoading(true)
    await builder.finish(ui)
    const id = await characters.create(Object.assign(builder.character.toJson(), { settings: 'manual' }))
    builder.clear()
    history.push(`/character/${id}`)
  }

  if (ui.status && ui.content) {
    return <Page className='new game'>{ui.content}</Page>
  }

  if (loading) {
    return <Loader className='new page' />
  }

  if (!builder) {
    return <Page className='choose game'>
      <OptionsChoice title='choose game' options={SUPPORTED_RULEBOOKS} onChoice={initializeBuilder} />
    </Page>
  }

  if (!choice) {
    return <Page className={`choose playbook rules ${builder.rulebook.rulebooks.join(' ')}`}>
      <OptionsChoice title='choose playbook' options={builder.playbookOptions()} onChoice={start} />
    </Page>
  }

  return <Page className={builder.rulebook.rulebooks.join(' ')}>
    <Choice choice={choice} builder={builder} onChoice={update} />
  </Page>
}

function Page ({ children, className='' }) { return <div className={`new page ${className}`}>{children}</div> }


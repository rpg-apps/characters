import React, { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Redirect } from 'react-router'

import '../../css/pages/new.scss'

import { useRules } from '../contexts/rules-context'

import Field from '../presentation/field'
import Loader from '../presentation/loader'
import { SUPPORTED_RULEBOOKS } from '../../games'

export default function New () {
  const rules = useRules()
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [builder, setBuilder] = useState()
  const [playbook, setPlaybook] = useState()
  const [choice, setChoice] = useState()

  const initializeBuilder = async rulebook => {
    const { characters } = await rules.get([rulebook])
    setBuilder(characters.builder)
  }

  const start = playbook => {
    builder.start(playbook)
    setPlaybook(playbook)
    setChoice(builder.choice)
  }

  const update = value => {
    builder.choose(value)
    if (builder.choice) {
      setChoice(builder.choice)
    } else {
      setLoading(true)
      finish()
    }
  }

  const finish = async () => {
    builder.finish()
    await builder.afterFinish()
    setDone(true)
  }

  if (loading) {
    return <Loader className='new page' />
  }

  if (done) {
    return <Redirect to="/" />
  }

  if (!builder) {
    return <Page className='choose game'>
      <OptionsChoice title='choose game' options={SUPPORTED_RULEBOOKS} onChoice={initializeBuilder} />
    </Page>
  }

  if (!playbook) {
    return <Page className={`choose playbook rules ${builder.rulebook.rulebooks.join(' ')}`}>
      <OptionsChoice title='choose playbook' options={builder.playbookOptions()} onChoice={start} />
    </Page>
  }

  const ChoiceComponent = Choices[builder.choice.constructor.name]

  return <Page className={builder.rulebook.rulebooks.join(' ')}>
    <ChoiceComponent choice={choice} builder={builder} onChoice={update} />
  </Page>
}

function Page ({ children, className='' }) { return <div className={`new page ${className}`}>{children}</div> }

function FieldChoice ({ choice, builder, onChoice }) {
  const [value, setValue] = useState()
  const options = builder.playbook.fields[choice.field]

  const submit = () => {
    onChoice(value)
    setValue('')
  }

  if (Array.isArray(options[0])) {
    const update = option => {
      const group = options.find(g => g.includes(option))
      const newValue = (Array.isArray(value) ? value : []).filter(item => !group.includes(item)).concat([option])
      setValue(newValue)
    }

    return <div className={`field choice ${choice.name}`}>
      <div className='title'>{choice.name}</div>
      <div className='options'>
        {options.map((optionsCollection, index) =>
          <div key={index} className='options-collection'>
            {optionsCollection.map((option, index) =>
              <Field className={`option ${value.includes(option) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={option} handleEvent={() => update(option)}/>
            )}
          </div>
        )}
      </div>
      <div className='button' onClick={submit}><FaArrowRight />next</div>
    </div>
  }

  return <div className={`field choice ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    <div className='options'>
      {options.map((option, index) => <Field className={`option ${value === option ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={option} handleEvent={() => setValue(option)}/>)}
    </div>
    <div className='button' onClick={submit}><FaArrowRight />next</div>
  </div>
}

function AssignmentChoice ({ builder, choice, onChoice }) {
  const [value, setValue] = useState({})
  const [selection, setSelection] = useState({})

  const source = builder.playbook.fields[choice.source]
  const target = choice.target

  const assign = newSelection => {
    setValue({ ...value, [newSelection.target]: newSelection.source })
    setSelection({})
  }

  const unassign = unassigned => {
    let key
    if (source.includes(unassigned)) key = target.find(targetKey => value[targetKey] === unassigned)
    if (target.includes(unassigned)) key = unassigned

    const newValue = value
    delete value[key]
    setValue(newValue)
    setSelection({})
  }

  const select = selectionAddition => {
    let addition = { }
    if (source.includes(selectionAddition)) addition = { source: selectionAddition }
    if (target.includes(selectionAddition)) addition = { target: selectionAddition }

    const newSelection = { ...selection, ...addition }
    if (newSelection.source && newSelection.target) assign(newSelection)
    else                                            setSelection(newSelection)
  }

  const handle = item => {
    if (Object.keys(value).includes(item) || Object.values(value).includes(item)) {
      unassign(item)
    } else {
      select(item)
    }
  }

  return <div className={`assignment choice ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    <div className='selection'>
      <div className='source'>
        {source.map((sourceValue, index) => <Field className={`recommendation ${selection.source === sourceValue ? 'selected' : ''} ${Object.values(value).includes(sourceValue) ? 'done' : ''}`}
          noSwipe={true} noDirect={true} key={index} value={sourceValue} handleEvent={() => handle(sourceValue)}/>)}
      </div>
      <div className='target'>
        {target.map((targetValue, index) => <Field className={`recommendation ${selection.target === targetValue ? 'selected' : ''} ${Object.keys(value).includes(targetValue) ? 'done' : ''}`}
          noSwipe={true} noDirect={true} key={index} name={targetValue} value={value[targetValue]} handleEvent={() => handle(targetValue)} />)}
      </div>
    </div>
    <div className='button' onClick={() => onChoice(value)}><FaArrowRight />next</div>
  </div>
}

function TypeChoice ({ builder, choice, onChoice }) {
  const [value, setValue] = useState('')
  const [recommendations, setRecommendations] = useState()

  useEffect(() => {
    if (choice.recommendations) {
      setRecommendations(builder.playbook.fields[choice.recommendations])
    }
  }, [builder.playbook.fields, choice.recommendations])

  const submit = () => {
    onChoice(value)
    setValue('')
    setRecommendations()
  }

  const input = (() => {
    if (choice.type === 'long text')
      return <textarea value={value} onChange={e => setValue(e.target.value)} />
    else
      return <input type={choice.type} value={value} onChange={e => setValue(e.target.value)} />
  })()

  return <div className={`type choice ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    {input}
    <Recommendations recommendations={recommendations} val={value} setValue={setValue} />
    <div className='button' onClick={submit}><FaArrowRight />next</div>
  </div>
}

function Recommendations ({ recommendations, val, setValue }) {
  if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) return ''

  if (Array.isArray(recommendations[0])) {
    const update = ({ value }) => {
      const group = recommendations.find(g => g.includes(value))
      const newValue = group.filter(item => val.includes(item)).reduce((result, item) => {
        return result.replace(item, '')
      }, val)
        .replace(/^(,\s*)*/, '')
        .replace(/(,\s*)*$/, '')
        .replace(/,\s*(,\s*)+/, ', ')
      setValue(newValue.length > 0 ? `${newValue}, ${value}` : value)
    }

    return <div className='recommendations'>
      <div className='title'>recommendations</div>
      <div className='options'>
        {recommendations.map((recommendationCollection, index) =>
          <div key={index} className='recommendations-collection'>
            {recommendationCollection.map((recommendation, index) =>
              <Field className={`recommendation ${val.includes(recommendation) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={recommendation} handleEvent={update}/>
            )}
          </div>
        )}
      </div>
    </div>
  }

  return <div className='recommendations'>
    <div className='title'>recommendations</div>
    <div className='options'>
      {recommendations.map((recommendation, index) =>
        <Field className={`recommendation ${val.includes(recommendation) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={recommendation} handleEvent={() => setValue(recommendation)}/>
      )}
    </div>
  </div>
}

function OptionsChoice ({ title, options, onChoice }) {
  if (options.length === 1) {
    onChoice(options[0])
    return ''
  }
  return [
    <div key='title' className='title'>{title}</div>,
    <div key='options' className='options'>
      {options.map((option, index) => <Field key={index} value={option} handleEvent={async () => await onChoice(option)}/>)}
    </div>
  ]
}

const Choices = { TypeChoice, FieldChoice, AssignmentChoice }

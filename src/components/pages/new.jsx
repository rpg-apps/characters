import React, { useState, useEffect } from 'react'
import { FaArrowRight } from 'react-icons/fa'

import '../../css/pages/new.scss'

import { useRules } from '../contexts/rules-context'

import Field from '../presentation/field'
import Loader from '../presentation/loader'
import { SUPPORTED_RULEBOOKS } from '../../games'

export default function New () {
  const rules = useRules()
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
    console.log(builder.choice)
  }

  const update = value => {
    builder.choose(value)
    setChoice(builder.choice)
    console.log(builder.choice)
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
  const options = builder.playbook

  const submit = () => {
    onChoice(value)
    setValue('')
  }

  return <div className={`field choice ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    {options.map(option => <Field className={value === option ? 'selected' : ''} {...option} onClick={() => setValue(option)}/>)}
    <div className='button' onClick={submit}><FaArrowRight />next</div>
  </div>
}

function AssignmentChoice ({ builder, choice, onChoice }) {
  const [value, setValue] = useState({})
  const [source, setSource] = useState([])
  const [selection, setSelection] = useState()

  useEffect(() => {
    console.log(builder.playbook.fields[choice.source])
    setSource(builder.playbook.fields[choice.source])
  }, [builder.playbook.fields, choice.source])

  const select = sourceValue => {
    setSelection(sourceValue)
  }

  const assign = target => {
    setValue({ ...value, [target]: selection })
    setSelection()
  }

  return <div className={`assignment choice ${choice.name}`}>
    <div className='title'>{choice.name}</div>
    <div className='selection'>
      <div className='source'>
        {source.map(sourceValue => <Field className={`recommendation ${selection === sourceValue ? 'selected' : ''} ${Object.values(value).includes(sourceValue) ? 'done' : ''}`}
          noSwipe={true} noDirect={true} key={sourceValue} value={sourceValue} handleEvent={() => select(sourceValue)}/>)}
      </div>
      <div className='target'>
        {choice.target.map(target => <Field className={`recommendation ${Object.keys(value).includes(target) ? 'done' : ''}`}
          noSwipe={true} noDirect={true} key={target} value={target} handleEvent={() => assign(target)}/>)}
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
        {recommendations.map(recommendationCollection =>
          <div className='recommendations-collection'>
            {recommendationCollection.map(recommendation =>
              <Field className={`recommendation ${val.includes(recommendation) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={recommendation} value={recommendation} handleEvent={update}/>
            )}
          </div>
        )}
      </div>
    </div>
  }

  return <div className='recommendations'>
    <div className='title'>recommendations</div>
    <div className='options'>
      {recommendations.map(recommendation =>
        <Field className={`recommendation ${val.includes(recommendation) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={recommendation} value={recommendation} handleEvent={() => setValue(recommendation)}/>
      )}
    </div>
  </div>
}

function OptionsChoice ({ title, options, onChoice }) {
  if (options.length === 1) {
    onChoice(options[0])
    return <Loader />
  }
  return [
    <div className='title'>{title}</div>,
    <div className='options'>
      {options.map(option =><Field key={option} value={option} handleEvent={async () => await onChoice(option)}/>)}
    </div>
  ]
}

const Choices = { TypeChoice, FieldChoice, AssignmentChoice }

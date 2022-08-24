import React from 'react'

import Input from '../../../presentation/input'
import { Uncalculated } from '../../../presentation/character'

export default function TypeChoice ({ builder, choice, control }) {
  const [value, setValue] = control

  return <div className='choice'>
    <div className='input'>
      <Input.Controlled type={{ [choice.name]: choice.type }} control={[{ [choice.name]: value }, data => setValue(data[choice.name])]}/>
    </div>
    <Recommendations recommendations={builder.playbook.fields[choice.recommendations]} control={control}/>
  </div>
}

function Recommendations ({ recommendations, control }) {
  const [val, setValue] = control
  if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) return ''

  if (Array.isArray(recommendations[0])) {
    const update = (value) => {
      const previousValue = val || ''
      const group = recommendations.find(g => g.includes(value))
      const newValue = group.filter(item => previousValue.includes(item)).reduce((result, item) => {
        return result.replace(item, '')
      }, previousValue)
        .replace(/^(,\s*)*/, '')
        .replace(/(,\s*)*$/, '')
        .replace(/,\s*(,\s*)+/, ', ')
      setValue(newValue.length > 0 ? `${newValue}, ${value}` : value)
    }

    const selected = recommendation => val.includes(recommendation)

    return <div className='recommendations'>
      <div className='title'>recommendations</div>
      <div className='options'>
        {recommendations.map((recommendationCollection, index) => <div key={index} className='recommendations collection'>
          {recommendationCollection.map((recommendation, index) => <div key={index} className={`${selected(recommendation) ? 'selected' : ''} option`} onClick={() => update(recommendation)}>
            <Uncalculated value={recommendation} />
          </div>)}
        </div>)}
      </div>
    </div>
  }

  const selected = recommendation => (val === recommendation)

  return <div className='recommendations'>
    <div className='title'>recommendations</div>
    <div className='options'>
      {recommendations.map((recommendation, index) => <div key={index} className={`${selected(recommendation) ? 'selected' : ''} option`} onClick={() => setValue(recommendation)}><Uncalculated value={recommendation} /></div>)}
    </div>
  </div>
}

TypeChoice.initialValue = ''

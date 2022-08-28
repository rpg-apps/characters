import React from 'react'

import Input from '../../../presentation/input'
import Title from '../../../presentation/title'

import { Selection } from '../../../presentation/character/selection'

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

    const selected = recommendation => (val || '').includes(recommendation)

    return <div className='recommendations'>
      <Title title='recommendations' />
      <div className='selections'>
        {recommendations.map((recommendationCollection, index) => <div key={index} className='recommendations collection'>
          <Selection.Uncalculated className='recommendations' options={recommendationCollection} selected={selected} select={update} />
        </div>)}
      </div>
    </div>
  }

  const selected = recommendation => (val === recommendation)

  return <Selection.Uncalculated className='recommendations' title='recommendations' options={recommendations} selected={selected} select={setValue} />
}

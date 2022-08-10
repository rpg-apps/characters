import React from 'react'

import Input from '../../../presentation/input'

// CONTINUE HERE!! Type choice is not usable since the value in the jsonforms is returned as object, and not as a basic property.
export default function TypeChoice ({ builder, choice, onChoice, control }) {
  return <div className='input'>
    <Input.Controlled type={choice.type} control={control}/>
    <Recommendations recommendations={builder.playbook.fields[choice.recommendations]} control={control}/>
  </div>
}

function Recommendations ({ recommendations, control }) {
  const [val, setValue] = control
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
          </div>
        )}
      </div>
    </div>
  }

  return <div className='recommendations'>
    <div className='title'>recommendations</div>
    <div className='options'>
    </div>
  </div>
}

TypeChoice.initialValue = ''

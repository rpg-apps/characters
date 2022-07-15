import React from 'react'

import Field from '../../../presentation/field'
import Input from '../../../presentation/input'

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
            {recommendationCollection.map((recommendation, index) =>
              <Field className={`recommendation ${val.includes(recommendation) ? 'selected' : ''}`} key={index} value={recommendation} handleEvent={update}/>
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
        <Field className={`recommendation ${(val === recommendation) ? 'selected' : ''}`} key={index} value={recommendation} handleEvent={() => setValue(recommendation)}/>
      )}
    </div>
  </div>
}

TypeChoice.initialValue = ''

import React from 'react'

import Field from '../../../presentation/field'

export default function FieldChoice ({ choice, builder, onChoice, control }) {
  return <Options options={builder.playbook.fields[choice.field]} control={control} />
}

function Options ({ options, control }) {
  const [value, setValue] = control
  if (Array.isArray(options[0])) {
    const update = option => {
      const group = options.find(g => g.includes(option))
      setValue((Array.isArray(value) ? value : []).filter(item => !group.includes(item)).concat([option]))
    }

    return <div className='options'>
      {options.map((optionsCollection, index) =>
        <div key={index} className='options-collection'>
          {optionsCollection.map((option, index) =>
            <Field className={`option ${value.includes(option) ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={option} handleEvent={() => update(option)}/>
          )}
        </div>
      )}
    </div>
  }

  return <div className='options'>
    {options.map((option, index) => <Field className={`option ${value === option ? 'selected' : ''}`} noSwipe={true} noDirect={true} key={index} value={option} handleEvent={() => setValue(option)}/>)}
  </div>
}

FieldChoice.initialValue = []

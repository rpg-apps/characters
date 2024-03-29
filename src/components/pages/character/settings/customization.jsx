import React from 'react'

import Input from '../../../presentation/input'

export default function Customization ({ settings, value, onChange }) {
  return Object.entries(settings).map(([groupTitle, groupSettings]) => <div key={groupTitle} className='group'>
    <div className='group-title'>{groupTitle}</div>
    {Object.entries(groupSettings).map(([settingTitle, { text, type }]) => <div key={settingTitle} className='setting'>
      <Input text={text} type={type} value={value?.[groupTitle]?.[settingTitle]} onChange={settingValue => {
        value[groupTitle] = value[groupTitle] || {}
        value[groupTitle][settingTitle] = settingValue
        onChange()
      }} />
    </div>)}
  </div>)
}

Customization.Button = function CustomizationButton ({ selected, onClick }) {
  return <div className={`${selected ? 'selected' : ''} custom`} onClick={onClick}>
    <div className='name'>Custom</div>
    <div className='description'>Create your own custom settings.</div>
  </div>
}

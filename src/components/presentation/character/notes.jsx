import { useState, useEffect } from 'react'
import Input from '../input'

export default function Edit ({ character, reprocess, requireSave }) {
  const [value, setValue] = useState(character.notes)

  useEffect(() => {
    if (requireSave) {
      character.saveFunctions = (character.saveFunctions || []).filter(({ id }) => id !== 'notes')
      character.saveFunctions.push({ id: 'notes', callback: () => save(value) })
    }
  }, [setValue, character, value])

  const save = data => {
    character.notes = data
  }

  const onChange = async (data, errors) => {
    if (value !== data) {
      setValue(data)
      if (!requireSave) {
        await save(data)
        reprocess()
        await character.save()
        reprocess()
      }
    }
  }

  return <Input name='notes' value={value} type='long text' onChange={onChange} />
}

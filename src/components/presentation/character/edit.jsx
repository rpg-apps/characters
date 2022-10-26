import { useState, useEffect } from 'react'
import Input from '../input'

export default function Edit ({ field, character, context, reprocess, requireSave }) {
  const [value, setValue] = useState(NOT_READY)

  useEffect(() => {
    (async () => {
      if (requireSave) {
        character.saveFunctions = (character.saveFunctions || []).filter(({ id }) => id !== field)
        character.saveFunctions.push({ id: field, callback: () => save(value) })
      }
      if (value === NOT_READY) {
        const originalValue = await character.get(field, context)
        setValue(originalValue)
      }
    })()
  }, [field, setValue, character, context, value])

  const save = async (data) => {
    if (data === NOT_READY) return
    await character.set(field, data)
  }

  const onChange = async (data, errors) => {
    if (value !== data && value !== NOT_READY) {
      setValue(data)
      if (!requireSave) {
        await save(data)
        reprocess()
        await character.save()
        reprocess()
      }
    }
  }

  const type = character.getValuableType(field)
  const inputType = type.fieldTypes || type.name

  return <Input name={field} value={value} type={inputType} onChange={onChange} />
}

const NOT_READY = 'NOT_READY'

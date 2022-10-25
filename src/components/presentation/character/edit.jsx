import { useState, useEffect } from 'react'
import Input from '../input'

export default function Edit ({ field, character, context, reprocess }) {
  const [value, setValue] = useState(NOT_READY)

  useEffect(() => {
    (async () => {
      const correctValue = await character.get(field, context)
      setValue(correctValue)
    })()
  }, [field, setValue, character, context])

  const onChange = async (data, errors) => {
    if (value !== data && value !== NOT_READY) {
      setValue(data)
      reprocess()
      await character.set(field, data)
      reprocess()
    }
  } 

  const type = character.getValuableType(field)
  const inputType = type.fieldTypes || type.name

  return <Input name={field} value={value} type={inputType} onChange={onChange} />
}

const NOT_READY = 'NOT_READY'

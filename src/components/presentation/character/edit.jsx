import { useState, useCallback, useEffect } from 'react'
import mapObject from 'map-obj'

import Input from '../input'

export default function Edit ({ id, type, get, set, character, reprocess, requireSave, ...options }) {
  const [value, setValue] = useState(NOT_READY)

  useEffect(() => {
      if (requireSave) {
        character.saveFunctions = (character.saveFunctions || []).filter(saveFunction => saveFunction.id !== id)
        character.saveFunctions.push({ id, callback: () => save(value) })
      }
      (async () => {
        if (value === NOT_READY) {
          const originalValue = await get()
          setValue(originalValue)
        }
      })()
  }, [id, setValue, character, value, get])

  const save = async (data) => {
    if (data === NOT_READY) return
    await set(data)
  }

  const onChange = async (data, errors) => {
    if (value !== data && value !== NOT_READY && data !== NOT_READY) {
      setValue(data)
      if (!requireSave) {
        await save(data)
        reprocess()
        await character.save()
        reprocess()
      }
    }
  }

  return <Input name={id} value={value} type={type} onChange={onChange} {...options} />
}

Edit.Field = function EditField ({ field, type, character, context, ...editProps }) {
  const get = useCallback(async () => await character.get(field, context), [field, character, context])
  const set = useCallback(async data => await character.set(field, data), [field, character])

  if (!type) {
    type = character.getValuableType(field)
    type = type.fieldTypes || type.name
  }

  return <Edit id={field} type={type} get={get} set={set} character={character} {...editProps} />
}

Edit.Notes = function EditNotes ({ character, ...editProps }) {
  const get = useCallback(() => character.notes, [character])
  const set = useCallback(data => { character.notes = data }, [character])

  return <Edit id='notes' type='long text' get={get} set={set} character={character} {...editProps} />
}

Edit.Settings = function EditSettings ({ character, ...editProps }) {
  const get = useCallback(() => mapObject(character.adapter.settings, key => [key, character.settings.get(key)], [character]))
  const set = useCallback(settings => character.settings.setMultiple(settings), [character])

  const type = mapObject(character.adapter.settings, (key, value) => [key, value.type])
  return <Edit id='settings' type={type} get={get} set={set} character={character} {...editProps} />
}

const NOT_READY = 'NOT_READY'

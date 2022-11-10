
import { useState, useCallback, useEffect } from 'react'
import mapObject, { mapObjectSkip } from 'map-obj'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import TuneIcon from '@mui/icons-material/Tune'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'

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
  const get = useCallback(() => mapObject(character.adapter.settings, (key, setting) => (setting.universal || character.settings.plan === 'custom') ? [key, character.settings.get(key)] : mapObjectSkip, [character]))
  const set = useCallback(settings => character.settings.setMultiple(settings), [character])

  const type = mapObject(character.adapter.settings, (key, setting) => (setting.universal || character.settings.plan === 'custom') ? [key, setting.type] : mapObjectSkip)
  return <Stack gap={2}>
    <PlanSelection character={character} {...editProps} />
    <Edit id='settings' type={type} get={get} set={set} character={character} {...editProps} />
  </Stack>
}

function PlanSelection ({ character, reprocess, ...others }) {
  const plans = [
    { name: 'manual', icon: <EditIcon />, description: 'Just like a character sheet' },
    { name: 'automatic', icon: <AutoFixHighIcon />, description: 'Let the computer do the heavy lifting' },
    { name: 'custom', icon: <TuneIcon />, description: 'Decide on individual features' }
  ]

  const update = (event, plan) => {
    character.settings.plan = plan || character.settings.plan
    reprocess()
  }

  return <ToggleButtonGroup value={character.settings.plan} exclusive orientation='vertical' onChange={update}>
    {plans.map(({ name, icon, description }) => <ToggleButton value={name} aria-label={name} fullWidth textAlign='left' key={name}>
      <Stack direction='row' alignItems='center' justifyContent='flex-start' width={1} height={1} gap={1}>
        {icon}
        <Stack alignItems='flex-start' flexGrow={1}>
          {name}
          <Typography variant='caption' textAlign='left'>{description}</Typography>
        </Stack>
      </Stack>
    </ToggleButton>)}
  </ToggleButtonGroup>
}

const NOT_READY = 'NOT_READY'

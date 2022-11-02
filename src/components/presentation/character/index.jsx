import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'
import { pascalCase } from 'change-case'
import { isPlainObject } from 'is-plain-object'
import clone from 'clone'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import ToggleButton from '@mui/material/ToggleButton'
import Switch from '@mui/material/Switch'
import Checkbox from '@mui/material/Checkbox'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Rating from '@mui/material/Rating'
import Slider from '@mui/material/Slider'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Chip from '@mui/material/Chip'
import Divider from '@mui/material/Divider'
import CircularProgress from '@mui/material/CircularProgress'
import LinearProgress from '@mui/material/LinearProgress'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Tooltip from '@mui/material/Tooltip'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'

import *  as Icons from '@mui/icons-material'

import Input from '../input'
import Loader from '../loader'
import Popup from '../popup'
import Dialog from '../dialog'
import Edit from './edit'
import Status from './status'

const Schema = new ReactJsonSchema()
Schema.setComponentMap({
  Box, Stack, Grid, Typography, Paper,
  ButtonGroup, Button, IconButton, ToggleButtonGroup, ToggleButton, Switch, Checkbox, RadioGroup, Radio, Rating, Slider,
  Avatar, Badge, Chip, Divider, CircularProgress, LinearProgress, Accordion, AccordionSummary, AccordionDetails,
  Tooltip, Snackbar, Alert,
  BottomNavigation, BottomNavigationAction, Tabs, Tab,
  Loader, Popup, Dialog, Status, EditField: Edit.Field, EditNotes: Edit.Notes, EditSettings: Edit.Settings,
  ...Object.fromEntries(Object.entries(Icons).map(([key, value]) => [`${key}Icon`, value]))
})

export function Character ({ character, ui,  procedureUI, Component='div', className='', ...props }) {
  console.log(character)

  return <Component {...props} className={`character ${className} ${ui} ${character.rulebooks.join(' ')} ${character.playbook.name}`}>
    <Calculated character={character} schemaName={ui} procedureUI={procedureUI} />
  </Component>
}

export function Uncalculated ({ value }) {
  return <Processed schema={{ text: value }} action={async schema => {
      return Schema.parseSchema(await preprocess(schema))
  }} />
}

export function Calculated ({ character, schemaName, procedureUI }) {
  return <Processed schema={character.adapter.components[pascalCase(schemaName)]} action={async (schema, reprocess) => {
    return Schema.parseSchema(await preprocess(await calcaulte(schema, character, reprocess, procedureUI)))
  }} />
}

function Processed ({ schema, action }) {
  const [processedComponent, setProcessedComponent] = useState(null)

  const reprocess = async () => {
    setProcessedComponent(await action(schema, reprocess))
  }

  useEffect(() => { reprocess() }, [schema, action])

  if (!processedComponent) {
    return <Loader sx={{
      width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '1rem',
      '.logo': { width: '8rem', aspectRatio: '1' }
    }} />
  }

  return processedComponent
}

const recursivly = async (schema, callback) => {
  await callback(schema)

  if (schema.children) {
    for (const subschema of schema.children) {
      await recursivly(subschema, callback)
    }
  }

  return schema
}

const calcaulte = async (schema, character, reprocess, procedureUI) => {
  return await recursivly(clone(schema), async subschema => {
    const smartCalc = async (internalSchema, internalContext) => {
      const calculableFields = Object.keys(internalSchema).filter(key => !['children', 'collection', 'render'].includes(key))
      for (const field of calculableFields) {
        const value = internalSchema[field]
        if (field.startsWith('calc-')) {
          internalSchema[field.replace('calc-', '')] = await character.get(value, { context: internalContext })
          delete internalSchema[field]
        } else if (isPlainObject(value)) {
          await smartCalc(value)
        }
      }

      if (internalSchema.hasOwnProperty('collection') && internalSchema.hasOwnProperty('render') && !internalSchema.hasOwnProperty('children')) {
        const collection = await character.get(internalSchema['collection'], { context: internalContext })
        internalSchema.children = []
        for (const item of collection) {
          internalSchema.children.push(await smartCalc({ ...internalSchema.render }, { ...internalContext, item }))
        }
      }

      if (internalSchema.hasOwnProperty('open') && BUILTIN_DIALOGS.hasOwnProperty(internalSchema.open)) {
        internalSchema.dialog = BUILTIN_DIALOGS[internalSchema.open]
        delete internalSchema.open
      }

      INTERNAL_UI_FIELDS.filter(internalUIField => internalSchema.hasOwnProperty(internalUIField)).forEach(internalUIField => {
        const { content, ...props } = internalSchema[internalUIField]
        if (props.actions) {
          props.actions.filter(action => action.hasOwnProperty(ON_CLICK)).forEach(action => { action.onClick = handler(action[ON_CLICK], character, reprocess, procedureUI, internalContext) })
        }
        const anchor = Object.fromEntries(Object.entries(internalSchema).filter(([key]) => key !== internalUIField))
        Object.assign(internalSchema, {
          component: pascalCase(internalUIField),
          children: Array.isArray(content) ? [anchor, ...content] : [anchor, content]
        })
        Object.keys(internalSchema).filter(key => !(['component', 'children'].includes(key))).forEach(key => { delete internalSchema[key] })
        Object.assign(internalSchema, props)
      })

      if (SPECIAL_COMPONENTS.includes(internalSchema.component)) {
        Object.assign(internalSchema, { character, context: internalContext, reprocess })
      }

      return internalSchema
    }

    const context = Object.fromEntries(Object.entries(character.calculatedSettings).map(([key, value]) => ([`settings:${key}`, value])))
    await smartCalc(subschema, context)
  })
}

const INTERNAL_UI_FIELDS = ['dialog', 'popup']
const SPECIAL_COMPONENTS = ['EditField', 'EditNotes', 'EditSettings', 'Status']

const ON_CLICK = 'on click'

const handler = (action, character, reprocess, ui, context) => async () => {
  if (HANDLERS.hasOwnProperty(action)) {
    await HANDLERS[action](character, reprocess)
  } else {
    console.log(action)
    await character.execute(action, ui, context)
  }
}

const HANDLERS = {
  cancel: () => {},
  save: async (character, reprocess) => {
    for (let func of character.saveFunctions) {
      await func.callback()
    }
    reprocess()
    await character.save()
    reprocess()
    character.saveFunctions = []
  }
}

const BUILTIN_DIALOGS = {
  notes: {
    sx: { marginTop: '-20vh', '.MuiPaper-root': { width: '80vw' } },
    title: 'Character notes',
    content: [
      { component: 'EditNotes', requireSave: true }
    ],
    actions: [
      { text: 'Cancel', 'on click': 'cancel', variant: 'outlined' },
      { text: 'Save', 'on click': 'save', variant: 'outlined' }
    ]
  },
  settings: {
    sx: { marginTop: '-20vh', '.MuiPaper-root': { width: '80vw' } },
    title: 'Character settings',
    content: [
      { component: 'EditSettings', requireSave: true }
    ],
    actions: [
      { text: 'Cancel', 'on click': 'cancel', variant: 'outlined' },
      { text: 'Save', 'on click': 'save', variant: 'outlined' }
    ]
  }
}

const preprocess = async (schema, defaultComponent = 'Box') => {
  return await recursivly(schema, subschema => {
    subschema.component = subschema.component || defaultComponent
    if (Array.isArray(subschema.text)) {
      subschema.children = (subschema.children || []).concat(subschema.text.map(child => ({ text: child })))
      delete subschema.text
    } else if (isPlainObject(subschema.text)) {
      subschema.children = (subschema.children || []).concat(Object.entries(subschema.text).map(([key, value]) => ({ className: key, text: value })))
      delete subschema.text
    }
  })
}

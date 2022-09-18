import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'
import { pascalCase } from 'change-case'
import { isPlainObject } from 'is-plain-object'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
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

const Schema = new ReactJsonSchema()
Schema.setComponentMap({
  Box, Stack, Grid, Typography, Paper,
  ButtonGroup, Button, ToggleButtonGroup, ToggleButton, Switch, Checkbox, RadioGroup, Radio, Rating, Slider, Input,
  Avatar, Badge, Chip, Divider, CircularProgress, LinearProgress, Accordion, AccordionSummary, AccordionDetails, Loader,
  Tooltip, Snackbar, Alert,
  BottomNavigation, BottomNavigationAction, Tabs, Tab,
  ...Object.fromEntries(Object.entries(Icons).map(([key, value]) => [`${key}Icon`, value])) })

export function Character ({ character, ui, Component='div', className='', ...props }) {
  return <Component {...props} className={`character ${className} ${ui} ${character.rulebooks.join(' ')} ${character.playbook.name}`}>
    <Calculated character={character} schemaName={ui} />
  </Component>
}

export function Uncalculated ({ value }) {
  return <Processed schema={{ text: value }} action={async schema => {
      await preprocess(schema)
      return Schema.parseSchema(schema)
  }} />
}

export function Calculated ({ character, schemaName }) {
  return <Processed schema={character.adapter.components[pascalCase(schemaName)]} action={async schema => {
    await calcaulte(schema, character)
    await preprocess(schema)
    return Schema.parseSchema(schema)
  }} />
}

function Processed ({ schema, action }) {
  const [processedComponent, setProcessedComponent] = useState(null)

  useEffect(() => { (async () => { setProcessedComponent(await action(schema)) }) () }, [schema, preprocess])

  if (!processedComponent) {
    return <Loader />
  }

  return processedComponent
}

const recursivly = async (schema, callback) => {
  await callback(schema)

  if (schema.children) {
    for (const subschema of schema.children) {
      await recursivly(subschema, callback)    }
  }

  return schema
}

const calcaulte = async (schema, character) => {
  const context = Object.fromEntries(Object.entries(character.calculatedSettings).map(([key, value]) => ([`settings:${key}`, value])))
  return await recursivly(Object.assign({}, schema), async subschema => {
    const smartCalc = async internalSchema => {
      const keys = Object.keys(internalSchema).filter(key => key !== 'children')
      for (const key of keys) {
        const value = internalSchema[key]
        if (key.startsWith('calc-')) {
          internalSchema[key.replace('calc-', '')] = await character.get(value, { context })
          delete internalSchema[key]
        } else if (isPlainObject(value)) {
          await smartCalc(value)
        }
      }
    }
    await smartCalc(subschema)
  })
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

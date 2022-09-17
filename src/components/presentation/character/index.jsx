import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'
import { pascalCase } from 'change-case'
import { isPlainObject } from 'is-plain-object'

import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'

import Loader from '../loader'

const Schema = new ReactJsonSchema()
Schema.setComponentMap({ Button, Paper })

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

const preprocess = async (schema, defaultComponent = 'div') => {
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

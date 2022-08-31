import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'
import { pascalCase } from 'change-case'
import { isPlainObject } from 'is-plain-object'

import Loader from '../loader'

const Schema = new ReactJsonSchema()

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
    for (let subschema of schema.children) {
      await recursivly(subschema, callback)    }
  }

  return schema
}

const calcaulte = async (schema, character) => {
  return await recursivly(schema, async subschema => {
    if (subschema.value) subschema.text = await character.get(subschema.value, { })
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

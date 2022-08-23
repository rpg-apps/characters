import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'
import { camelCase } from 'change-case'

import Loader from './loader'

const Schema = new ReactJsonSchema()

export function Character ({ character, ui, Component='div', className, ...props }) {
  return <Component {...props} className={`character ${className} ${ui} ${character.rulebooks.join(' ')}`}>
    <Calculated character={character} component={ui} />
  </Component>
}

export function Uncalculated ({ value, component = 'div' }) {
  return <Processed schema={value.constructor === String ? { text: value } : value} component={component} preprocess={async schema => {
      preprocess(schema)
      return Schema.parseSchema(schema)
  }} />
}

export function Calculated ({ character, component = 'div' }) {
  const schema = character.adapter.components[camelCase(component)]
  return <Processed schema={schema} component={component} preprocess={async schema => {
      preprocess(schema)
      await calcaulte(schema, character)
      return Schema.parseSchema(schema)
  }} />
}

function Processed ({ schema, component = 'div', preprocess }) {
  const [processedComponent, setProcessedComponent] = useState(null)

  useEffect(() => { (async () => { setProcessedComponent(await preprocess(schema)) }) () }, [schema, component, preprocess])

  if (!processedComponent) {
    return <Loader />
  }

  return processedComponent
}

const recursivly = async (schema, callback) => {
  if (schema.children) {
    for (let subschema of schema.children) {
      await recursivly(subschema, callback)
    }
  }

  await callback(schema)
  return schema
}

const calcaulte = async (schema, character) => {
  return await recursivly(schema, async subschema => {
    if (subschema.value) subschema.text = await character.get(subschema.value, { })
  })
}

const preprocess = async (schema, defaultComponent = 'div') => {
  return await recursivly(schema, async subschema => {
    schema.component = schema.component || defaultComponent
  })
}

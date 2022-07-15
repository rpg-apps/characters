import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import mapObject from 'map-obj'

export default function Input ({ value='', type, onChange=()=>{}, layout=Layout.VERTICAL }) {
  const adapter = generateAdapter(type, ROOT_SCOPE, layout)
  console.log(adapter)
  return <JsonForms scheme={adapter.scheme}
                    uischema={adapter.uiScheme}
                    data={adapter.value(value)}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={adapter.onChange(onChange)}
          />
}

Input.Controlled = function ControlledInput ({ type, control, layout }) {
  return <Input type={type} value={control[0]} onChange={control[1]} layout={layout} />
}

function generateAdapter (type, scope, layout) {
  if (type.constructor === String) {
    if (type.startsWith('array ')) {
      return arrayInputAdapter(type, scope, layout)
    } else {
      return basicInputAdapter(type, scope, layout)
    }
  }
  return objectInputAdapter(type, scope, layout)
}

const arrayInputAdapter = (type, scope, layout) => {
  const itemsAdapater = generateAdapter(type.replace(/^array /, ''), scope, Layout.flip(layout))
  return {
    scheme: { type: 'array', items: itemsAdapater.scheme },
    uiScheme: { type: 'Control', scope },
    value: val => val || [],
    defaultData: [],
    onChange: callback => ({ data, errors }) => callback(data, errors)
  }
}

const objectInputAdapter = (type, scope, layout) => {
  const adapters = mapObject(type, (field, subtype) => [field, generateAdapter(subtype, `${scope}/properties/${field}`, Layout.flip(layout))])
  const defaultData = mapObject(adapters, (field, adapter) => [field, adapter.defaultData])
  return {
    scheme: { type: 'object', properties: mapObject(adapters, (field, adapter) => [field, adapter.scheme]), required: Object.keys(adapters) },
    uiScheme: { type: layout, elements: Object.values(adapters).map(adapter => adapter.uiScheme)  },
    value: val => val || defaultData,
    defaultData,
    onChange: callback => ({ data, errors }) => callback(data, errors)
  }
}

const basicInputAdapter = (type, scope, layout) => {
  if (scope === ROOT_SCOPE) {
    const adapter = objectInputAdapter({ value: type }, scope, layout)
    adapter.uiScheme.elements[0].label = false
    adapter.value = value => (value ? ({ value }) : adapter.defaultData)
    adapter.onChange = callback => ({ data, errors }) => callback(data.value, errors)
    return adapter
  }
  const adapter = BASIC_TYPES[type]
  if (!adapter) throw new Error(`Missing Input Adapater ${type}`)
  return {
    scheme: { type: adapter.name },
    uiScheme: { type: 'Control', options: { ...(adapter.ui || {}), hideRequiredAsterisk: true }, scope },
    value: val => val || adapter.defaultData,
    defaultData: adapter.defaultData,
    onChange: callback => ({ data, errors }) => callback(data, errors)
  }
}

const BASIC_TYPES = {
  'boolean':    { name: 'boolean',  defaultData: false },
  'number':     { name: 'number',   defaultData: 0 },
  'text':       { name: 'string',   defaultData: '' },
  'long text':  { name: 'string',   defaultData: '',  ui: { multi: true } },
  'email':      { name: 'string',   defaultData: '' },
  'password':   { name: 'string',   defaultData: '',  ui: { format: 'password' } }
}

const ROOT_SCOPE = '#'

const Layout = { HORIZONTAL: 'HorizonalLayout', VERTICAL: 'VerticalLayout' }
Layout.flip = layout => (layout === Layout.VERTICAL) ? Layout.HORIZONTAL : Layout.VERTICAL
Input.Layout = Layout

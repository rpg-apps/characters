import React from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import mapObject from 'map-obj'

export default function Input ({ value='', type, onChange=()=>{}, layout=Layout.VERTICAL }) {
  const adapter = generateAdapter(type, ROOT_SCOPE, layout)
  console.log(JSON.stringify(adapter))
  return <JsonForms scheme={adapter.scheme}
                    uischema={adapter.uiScheme}
                    data={value || adapter.defaultData}
                    renderers={materialRenderers}
                    cells={materialCells}
                    onChange={onChange}
          />
}

Input.Controlled = function ControlledInput ({ type, control, layout }) {
  return <Input type={type} value={control[0]} onChange={({ data }) => control[1](data)} layout={layout} />
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
    defaultData: []
  }
}

const objectInputAdapter = (type, scope, layout) => {
  const adapters = mapObject(type, (field, subtype) => [field, generateAdapter(subtype, `${scope}/properties/${field}`, Layout.flip(layout))])
  return {
    scheme: { type: 'object', properties: mapObject(adapters, (field, adapter) => [field, adapter.scheme]), required: Object.keys(adapters) },
    uiScheme: { type: layout, elements: Object.values(adapters).map(adapter => adapter.uiScheme)  },
    defaultData: mapObject(adapters, (field, adapter) => [field, adapter.defaultData])
  }
}

const basicInputAdapter = (type, scope, layout) => {
  if (scope === ROOT_SCOPE) {
    const adapater = objectInputAdapter({ value: type }, scope, layout)
    adapater.uiScheme.elements[0].label = false
    return adapater
  }
  const adapater = BASIC_TYPES[type]
  if (!adapater) throw new Error(`Missing Input Adapater ${type}`)
  return {
    scheme: { type: adapater.name },
    uiScheme: { type: 'Control', options: { ...(adapater.ui || {}), hideRequiredAsterisk: true }, scope },
    defaultData: adapater.defaultData
  }
}

const BASIC_TYPES = {
  'boolean': { name: 'string', defaultData: false },
  'number': { name: 'string', defaultData: 0 },
  'text': { name: 'string', defaultData: '' },
  'long text': { name: 'string', defaultData: '' },
  'email': { name: 'string', defaultData: '' },
  'password': { name: 'string', ui: { format: 'password' }, defaultData: '' }
}

const ROOT_SCOPE = '#'

const Layout = { HORIZONTAL: 'HorizonalLayout', VERTICAL: 'VerticalLayout' }
Layout.flip = layout => (layout === Layout.VERTICAL) ? Layout.HORIZONTAL : Layout.VERTICAL
Input.Layout = Layout

import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import mapObject from 'map-obj'

import { ajv, useErrors } from './validation'

export default function Input ({ value='', type, onChange=()=>{}, layout=Layout.VERTICAL }) {
  const adapter = generateAdapter(type, ROOT_SCOPE, layout)
  const { change, errors } = useErrors(adapter, onChange, ROOT_SCOPE)

  return <JsonForms schema={adapter.schema}           uischema={adapter.uiSchema}
                    renderers={materialRenderers}     cells={materialCells} ajv={ajv}
                    data={adapter.value(value)}       onChange={change}
                    validationMode='ValidateAndHide'  additionalErrors={errors}
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
    schema: { type: 'array', items: itemsAdapater.schema },
    uiSchema: { type: 'Control', scope },
    value: val => val || [],
    defaultData: [],
    onChange: callback => ({ data, errors }) => callback(data, errors),
    validate: (data, scope) => data.map(item => itemsAdapater.validate(item, scope, data)).reduce((arr, subarr) => arr.concat(subarr), [])
  }
}

const objectInputAdapter = (type, scope, layout) => {
  const adapters = mapObject(type, (field, subtype) => [field, generateAdapter(subtype, `${scope}/properties/${field}`, Layout.flip(layout))])
  const defaultData = mapObject(adapters, (field, adapter) => [field, adapter.defaultData])
  return {
    schema: { type: 'object', properties: mapObject(adapters, (field, adapter) => [field, adapter.schema]), required: Object.keys(adapters) },
    uiSchema: { type: layout, elements: Object.values(adapters).map(adapter => adapter.uiSchema)  },
    value: val => val || defaultData,
    defaultData,
    onChange: callback => ({ data, errors }) => callback(data, errors),
    validate: (data, scope) => Object.entries(adapters).map(([field, adapter]) => adapter.validate(data[field], `${scope}/properties/${field}`, data)).reduce((arr, subarr) => arr.concat(subarr), [])
  }
}

const basicInputAdapter = (type, scope, layout) => {
  if (scope === ROOT_SCOPE) {
    const adapter = objectInputAdapter({ value: type }, scope, layout)
    adapter.uiSchema.elements[0].label = false
    adapter.value = value => (value ? ({ value }) : adapter.defaultData)
    adapter.onChange = callback => ({ data, errors }) => callback(data.value, errors)
    return adapter
  }
  const adapter = BASIC_TYPES[type]
  if (!adapter) throw new Error(`Missing Input Adapater ${type}`)
  return {
    schema: { type: adapter.name, ...(adapter.options || {}) },
    uiSchema: { type: 'Control', options: { ...(adapter.ui || {}), hideRequiredAsterisk: true }, scope },
    value: val => val || adapter.defaultData,
    defaultData: adapter.defaultData,
    onChange: callback => ({ data, errors }) => callback(data, errors),
    validate: adapter.validate || (() => [])
  }
}

const BASIC_TYPES = {
  'boolean':      { name: 'boolean',  defaultData: false },
  'number':       { name: 'number',   defaultData: 0 },
  'text':         { name: 'string',   defaultData: '' },
  'long text':    { name: 'string',   defaultData: '',  ui: { multi: true } },
  'email':        { name: 'string',   defaultData: '', options: { format: 'email' } },
  'password':     { name: 'string',   defaultData: '',  ui: { format: 'password' }, options: { lengthRange: [6,128] } },
  'confirmation': { name: 'string',   defaultData: '',  ui: { format: 'password' }, options: { confirmation: true } }
}

const ROOT_SCOPE = '#'

const Layout = { HORIZONTAL: 'HorizonalLayout', VERTICAL: 'VerticalLayout' }
Layout.flip = layout => (layout === Layout.VERTICAL) ? Layout.HORIZONTAL : Layout.VERTICAL
Input.Layout = Layout

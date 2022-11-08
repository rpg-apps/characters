import { useState, useEffect } from 'react'
import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'
import Typography from '@mui/material/Typography'
import mapObject from 'map-obj'
import equal from 'fast-deep-equal/react'

import { ajv, useErrors } from './validation'
import NumberInput from './renderers/number-input'
import ColorInput from './renderers/color-input'

const renderers = [...materialRenderers, NumberInput, ColorInput]

export default function Input ({ value='', type='text', name=undefined, onChange=()=>{}, layout=Layout.VERTICAL, ...options }) {
  const adapter = generateAdapter(type, ROOT_SCOPE, layout, name, onChange, options)
  const [formState, setFormState] = useState({ errors: [], data: undefined })
  const getErrors = useErrors(adapter, ROOT_SCOPE)

  const change = ({ data, errors }) => {
    if (equal(data, formState.data) || equal(data, formState.previousData))  return
    setFormState({ errors: getErrors({ data, errors }), data, previousData: formState.data })
    return adapter.onChange({ data, errors })
  }

  useEffect(() => {
    setFormState({ ...formState, data: adapter.value(value), previousData: formState.data })
  }, [value])

  return <JsonForms schema={adapter.schema}           uischema={adapter.uiSchema}
                    renderers={renderers}             cells={materialCells} ajv={ajv}
                    data={formState.data}             onChange={change}
                    validationMode='ValidateAndHide'  additionalErrors={formState.errors}
  />
}

Input.Controlled = function ControlledInput ({ name, type, control, layout }) {
  return <Input type={type} value={control[0]} name={name} onChange={control[1]} layout={layout} />
}

function generateAdapter (type, scope, layout, name, onChange, options) {
  if (type.constructor === String) {
    if (type.startsWith('array ')) {
      return arrayInputAdapter(type, scope, layout, name, onChange, options)
    } else {
      return basicInputAdapter(type, scope, layout, name, onChange, options)
    }
  }
  return objectInputAdapter(type, scope, layout, name, onChange, options)
}

const arrayInputAdapter = (type, scope, layout, name, onChange, options) => {
  const itemsAdapater = generateAdapter(type.replace(/^array /, ''), scope, Layout.flip(layout), name, onChange, options)
  return {
    schema: { type: 'array', items: itemsAdapater.schema },
    uiSchema: { type: 'Control', scope },
    value: val => val || [],
    defaultData: [],
    onChange: ({ data, errors }) => onChange(data, errors),
    validate: (data, scope) => data.map(item => itemsAdapater.validate(item, scope, data)).reduce((arr, subarr) => arr.concat(subarr), [])
  }
}

const objectInputAdapter = (type, scope, layout, name, onChange, options) => {
  const adapters = mapObject(type, (field, subtype) => [field, generateAdapter(subtype, `${scope}/properties/${field}`, Layout.flip(layout), field, onChange, options)])
  const defaultData = mapObject(adapters, (field, adapter) => [field, adapter.defaultData])
  return {
    schema: { type: 'object', properties: mapObject(adapters, (field, adapter) => [field, adapter.schema]), required: Object.keys(adapters) },
    uiSchema: { type: layout, elements: Object.values(adapters).map(adapter => adapter.uiSchema)  },
    value: val => val || defaultData,
    defaultData,
    onChange: ({ data, errors }) => onChange(data, errors),
    validate: (data, scope) => Object.entries(adapters).map(([field, adapter]) => adapter.validate(data[field], `${scope}/properties/${field}`, data)).reduce((arr, subarr) => arr.concat(subarr), [])
  }
}

const basicInputAdapter = (type, scope, layout, name = 'value', onChange, options) => {
  if (scope === ROOT_SCOPE) {
    const adapter = objectInputAdapter({ [name]: type }, scope, layout, undefined, onChange, options)
    adapter.uiSchema.elements[0].label = name
    adapter.value = value => (value ? ({ [name]: value }) : adapter.defaultData)
    adapter.onChange = ({ data, errors }) => onChange(data[name], errors)
    return adapter
  }
  const adapter = BASIC_TYPES[type]
  if (!adapter) throw new Error(`Missing Input Adapater ${type}`)
  return {
    schema: { type: adapter.name, ...(adapter.options || {}), ...options },
    uiSchema: { type: 'Control', options: { ...(adapter.ui || {}), hideRequiredAsterisk: true }, scope, label: name },
    value: val => val || adapter.defaultData,
    defaultData: adapter.defaultData,
    onChange: ({ data, errors }) => onChange(data, errors),
    validate: adapter.validate || (() => [])
  }
}

const BASIC_TYPES = {
  'boolean':      { name: 'boolean',  defaultData: false, ui: { toggle: true } },
  'number':       { name: 'number',   defaultData: 0 },
  'text':         { name: 'string',   defaultData: '' },
  'long text':    { name: 'string',   defaultData: '',  ui: { multi: true } },
  'email':        { name: 'string',   defaultData: '', options: { format: 'email' } },
  'password':     { name: 'string',   defaultData: '',  ui: { format: 'password' }, options: { lengthRange: [6,128] } },
  'confirmation': { name: 'string',   defaultData: '',  ui: { format: 'password' }, options: { confirmation: true } },
  'color':        { name: 'string',   defaultData: '#000000', ui: { format: 'color' } }
}

const ROOT_SCOPE = '#'

const Layout = { HORIZONTAL: 'HorizonalLayout', VERTICAL: 'VerticalLayout' }
Layout.flip = layout => (layout === Layout.VERTICAL) ? Layout.HORIZONTAL : Layout.VERTICAL
Input.Layout = Layout

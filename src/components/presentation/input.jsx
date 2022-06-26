import React from 'react'

import { JsonForms } from '@jsonforms/react'
import { materialCells, materialRenderers } from '@jsonforms/material-renderers'

export default function Input ({ value='', type, onChange=()=>{} }) {
  return <JsonForms scheme={scheme(type)} uischema={uiScheme(type)} data={value} renderers={materialRenderers} cells={materialCells} onChange={onChange} />
}

Input.Defaults = {
  'text': '',
  'long text': '',
  'email': '',
  'password': ''
}

function scheme (type) {
  return {
    type: 'object',
    properties: Object.entries(type).reduce((props, [key, value]) => ({ ...props, [key]: schemeField(value) }), { }),
    required: Object.keys(type)
  }
}

function schemeField (type) {
  if (STRING_SYNONOMS.includes(type))  return { type: 'string' }
  return { type }
}

const STRING_SYNONOMS = ['text', 'long text', 'email']

function uiScheme (type) {
  return {
    type: 'VerticalLayout',
    elements: Object.entries(type).map(([key, value]) => ({ type: 'Control', scope: `#/properties/${key}`, ...fieldUiScheme(value) }))
  }
}

function fieldUiScheme (type) {
  const options = Object.assign({}, DEFAULT_UI)
  if (CONSTANT_UIS[type]) Object.assign(options, CONSTANT_UIS[type])
  return { options }
}

const DEFAULT_UI = { hideRequiredAsterisk: true }

const CONSTANT_UIS = {
  password: { format: 'password' }
}

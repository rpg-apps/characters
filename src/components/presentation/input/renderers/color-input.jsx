// 
import { withJsonFormsControlProps } from '@jsonforms/react'
import { rankWith, and, or, uiTypeIs, schemaTypeIs, formatIs, optionIs } from '@jsonforms/core'
import { MuiColorInput } from 'mui-color-input'

const isColorControl = and(uiTypeIs('Control'), schemaTypeIs('string'), or(formatIs('color'), optionIs('format', 'color')))

const renderer = withJsonFormsControlProps(function NumberControl ({ data, handleChange, path }) {
  return <MuiColorInput value={data} onChange={(rgb, { hex8 }) => handleChange(path, hex8)} />
})

const tester = rankWith(3, isColorControl)

export default { renderer, tester }

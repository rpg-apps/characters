import { useState } from 'react'
import AJV from 'ajv'
import addFormats from 'ajv-formats'

export const useErrors = (adapter, rootScope) => {
  return ({ data, errors }) => errors.filter(error => error.data !== '').concat(adapter.validate(data, rootScope, data))
}

export const ajv = new AJV({
  allErrors: true,
  verbose: true,
  strict: false
})
addFormats(ajv)

ajv.addKeyword({
  keyword: 'confirmation',
  validate: (keywordValue, data, inputSchema, { parentData }) => data && parentData.password && data === parentData.password,
  error: { message: 'Password and Confirmation should match' }
})

ajv.addKeyword({
  keyword: 'exclusiveMinLength',
  type: 'string',
  schemType: 'number',
  validate: (keywordValue, data, inputSchema, { parentData }) => data.length > keywordValue,
  error: { message: ctx => `Must have less then ${ctx.schema} characters` }
})

ajv.addKeyword({
  keyword: 'exclusiveMaxLength',
  type: 'string',
  schemType: 'number',
  validate: (keywordValue, data, inputSchema, { parentData }) => data.length < keywordValue,
  error: { message: ctx => `Must have less then ${ctx.schema} characters` }
})

ajv.addKeyword({
  keyword: 'lengthRange',
  type: 'string',
  schemType: 'array',
  validate: (keywordValue, data, inputSchema, { parentData }) => data.length >= keywordValue[0] && data.length <= keywordValue[1],
  error: { message: ctx => `Must have between ${ctx.schema[0]} and ${ctx.schema[1]} characters` }
})

ajv.addKeyword({
  keyword: 'exclusiveLengthRange',
  type: 'string',
  schemType: 'array',
  validate: (keywordValue, data, inputSchema, { parentData }) => data.length > keywordValue[0] && data.length < keywordValue[1],
  error: { message: ctx => `Must have between ${ctx.schema[0]} and ${ctx.schema[1]} characters (excluded)` }
})

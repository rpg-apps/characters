import { useState, useEffect } from 'react'
import ReactJsonSchema from 'react-json-schema'

import Loader from './loader'

const CharacterSchema = new ReactJsonSchema()

const calculate = async (schema, character) => {
  if (schema.children) {
    schema.children.forEach(subschema => calculate(subschema, character))
  }

  schema.component = schema.component || 'div'

  if (schema.value) {
    schema.text = await character.get(schema.value, { })
  }
}

export default function Character ({ character, ui, Component, ...props }) {
  const [characterComponent, setCharacterComponent] = useState([])

  useEffect(() => {
    (async () => {
      const schema = character.adapter[ui]
      await calculate(schema, character)
      setCharacterComponent(CharacterSchema.parseSchema(schema))
    }) ()
  }, [character, ui])

  if (!characterComponent) {
    return <Loader />
  }

  return <Component {...props} className={`character ${props.className} ${ui} ${character.rulebooks.join(' ')}`}>{characterComponent}</Component>
}

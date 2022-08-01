import ReactJsonSchema from 'react-json-schema'

const CharacterSchema = new ReactJsonSchema()

// CharacterSchema.setComponentMap({  })

const calculate = async (schema, character) => {
  if (schema.children) {
    schema.children.forEach(subschema => calculate(subschema, character))
  }

  schema.component = schema.component || 'div'

  if (schema.value) {
    console.log(character)
    schema.text = await character.get(schema.value, { })
  }
}

export default async function renderCharacter (schema, character) {
  await calculate(schema, character)
  return CharacterSchema.parseSchema(schema)
}

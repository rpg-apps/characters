export default class ChoiceParser {
  constructor(typeParser) {
    this.typeParser = typeParser
  }

  // When defining a choice in the 'choices' field or in a 'choose' statement
  parseDefinition (rawChoice) {
  	const choice = undefined
    this.choices.push(choice)
    return choice
  }

  // When using a choice using the 'choose' statement
  parseUsage (rawChoice) {
    const choice = undefined
    return choice
  }
}

export default class Description {
  constructor(props) {
    Object.assign(this, props)
  }

  choices () {
    
  }
}

Description.Name = (options) => new Description(options)
Description.Title = (options) => new Description(options)
Description.Look = (options) => new Description(options)


import React from 'react'
import { noCase } from 'change-case'
import Modal from 'react-modal'

import { adapters } from '../../games'
import Field from './field'
import CharacterSettings from './character-settings'

Modal.setAppElement('#root')

export default class Character extends React.Component  {
  constructor ({ character }) {
    super()
    this.character = character
    this.state = { focus: undefined, handlers: { } }
  }

  async componentDidMount () {
    await this.refreshHandlers()
  }

  async handleEvent ({ name, value }, event) {
    const eventType = noCase(event._reactName?.substr(2) || `${event.action}${event.dir}`)
    if (this.state.handlers?.[name]?.[eventType]) {
      const handler = this.state.handlers?.[name]?.[eventType]
      const procedure = (handler instanceof Function) ? handler(event) : handler
      await this.character.execute(procedure, this)
      this.forceUpdate()
      await this.character.save()
    }
  }

  async refreshHandlers () {
    const handlers = this.character.rulebooks.reduce((results, rulebook) => {
      const [game, rules] = rulebook.split(' ')
      return { ...results, ...adapters[game][rules].getHandlers(this.character.settings) }
    }, { })
    this.setState({ handlers })
  }

  settings () {
    return this.character.rulebooks.reduce((results, rulebook) => {
      const [game, rules] = rulebook.split(' ')
      return { ...results, ...adapters[game][rules].settings }
    }, { })
  }

  output (text) {
    this.setState({ focus: text })
  }

  input (text, type = 'string') {

  }

  choose (text, options, count = 1) {

  }

  closeFocus () {
    this.setState({ focus: undefined })
  }

  fields () {
    return []
      .concat(Object.entries(this.character.fields))
      .concat([['playbook', Object.assign({ name: this.character.playbook.name }, this.character.playbook.fields)]])
      .concat([['notes', this.character.notes]])
  }

  render () {
    return <div className={`character ${this.character.playbook.name} ${this.character.rulebooks.map(rb => rb.replace(' ', '-')).join(' ')}`}>
      {this.fields().map(([key, value]) => <Field key={key} name={key} value={value} handleEvent={this.handleEvent.bind(this)} />)}
      <CharacterSettings settings={this.settings()} value={this.character.settings} onChange={() => this.refreshHandlers()} />
      <Modal isOpen={Boolean(this.state.focus)} onRequestClose={() => this.closeFocus()}>{this.state.focus}</Modal>
    </div>
  }
}

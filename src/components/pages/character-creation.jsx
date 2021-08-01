import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import RulesContext from '../../contexts/rules-context'
import CharacterBuilder from '../../models/character-creation'

import '../../css/pages/character-creation.scss'

const MAX_BUTTONS = 3

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = { rulebook: undefined, builder: undefined }
  }

  componentDidMount () {
    this.setState({ rulebook: this.context, builder: new CharacterBuilder(this.context) })
  }

  setPlaybook (playbook) {
    this.setState({ playbook, builder: new CharacterBuilder(this.context) })
  }

  getPlaybookSelection () {
    return <SwipeableViews enableMouseEvents>
      {/* Add index view */}
      {this.state.rulebook.playbooks.map(playbook => <div className={`${playbook.name} playbook`} onClick={() => this.setPlaybook(playbook)}>
        <div className='title'>{playbook.name}</div>
        <div className='subtitle'>{playbook.getValue('in a sentence')}</div>
        <div className='content'>
          {playbook.getValue('introduction').split('\\n').map((line, key) => <div key={key}>{line}</div>)}
        </div>
      </div>)}
    </SwipeableViews>
  }

  renderChoice (choice) {
    if (choice.type.hasOwnProperty('from')) {
      const chocieOptions = this.state.builder.getValue(choice.type.from.name)
      if (!chocieOptions) {
        return ''
      }

      const renderOptionsChoice = (options) => {
        return <div className='from'>
          {options.length > MAX_BUTTONS ? <select>{options.map(option => <option>{option}</option>)}</select> : options.map(option => <div className='button'>{option}</div>)}
          {choice.free ? <input placeholder='Select another' /> : ''}
        </div>
      }

      if (Array.isArray(chocieOptions[0])) {
        return chocieOptions.map(renderOptionsChoice)
      } else {
        return renderOptionsChoice(chocieOptions)
      }

    }

    if (choice.type === 'text') {
      return <input name={choice.name} placeholder={choice.name} />
    }

    if (choice.type === 'long text') {
      return <textarea name={choice.name} placeholder={choice.name}/>
    }

    return JSON.stringify(choice)
  }

  content () {
    const { rulebook, playbook, builder } = this.state
    
    if (!rulebook) {
      return <div className='loader'></div>
    }

    if (!playbook) {
     return this.getPlaybookSelection() 
    }

    return <div className={`${playbook.name} playbook`}>
      <div className='title'>{playbook.name}</div>
      <div className='undo' title='undo' onClick={() => this.setState({ playbook: undefined, builder: undefined })}>UNDO</div>
      {builder.currentChoices.map(choice => <div className={`${choice.name} choice`}>
        {this.renderChoice(choice)}
        <div className='button'>Done</div>
      </div>)}
    </div>
  }

  render () {
    return <div id='new'>
      {this.content()}
    </div>
  }
}

CharacterCreation.contextType = RulesContext

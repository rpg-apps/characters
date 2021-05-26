import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import RulesContext from '../../contexts/rules-context'
import CharacterBuilder from '../../models/character-builder'

import Choice from '../character-creation-choice'

import '../../css/pages/character-creation.scss'

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = { rulebook: undefined, builder: undefined }
  }

  componentDidMount () {
    this.setState({ rulebook: this.context })
  }

  setPlaybook (playbook) {
    this.setState({ playbook, builder: new CharacterBuilder(playbook, this.context) })
  }

  getPlaybookSelection () {
    return <SwipeableViews enableMouseEvents>
      {this.state.rulebook.playbooks.map(playbook => <div className={`${playbook.name} playbook`} onClick={() => this.setPlaybook(playbook)}>
        <div className='title'>{playbook.name}</div>
        <div className='subtitle'>{playbook['in a sentence'].formula.getValue()}</div>
        <div className='content'>
          {playbook.introduction.formula.getValue().split('\\n').map((line, key) => <div key={key}>{line}</div>)}
        </div>
      </div>)}
    </SwipeableViews>
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
      {builder.choices.map(choice => <Choice {...choice} set={selection => builder.choose(choice, selection)}/>)}
    </div>
  }

  render () {
    return <div id='new'>
      {this.content()}
    </div>
  }
}

CharacterCreation.contextType = RulesContext
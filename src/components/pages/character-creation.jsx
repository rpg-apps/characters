import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import RulesContext from '../../contexts/rules-context'
import CharacterBuilder from '../../models/character-creation'

import '../../css/pages/character-creation.scss'

const MAX_BUTTONS = 3

export default class CharacterCreation extends React.Component {
  constructor () {
    super()
    this.state = { rulebook: undefined, builder: undefined, about: undefined }
  }

  componentDidMount () {
    this.setState({ rulebook: this.context, builder: new CharacterBuilder(this.context) })
  }

  setPlaybook (playbook) {
    this.state.builder.choosePlaybook(playbook.name)
    this.forceUpdate()
  }

  toggleAbout (playbook) {
    const about = (this.state.about === playbook.name) ? undefined : playbook.name
    this.setState({ about })
  }

  render () {
    return <div id='new'>
      {this.content()}
    </div>
  }

  content () {
    const { builder } = this.state

    if (!builder) {
      return <div className='loader'></div>
    }

    switch (builder.status) {
      case CharacterBuilder.STATUS.CHOSING_PLAYBOOK:          return this.renderPlaybookChoice()
      case CharacterBuilder.STATUS.CHOOSING_CHARACTER_TRAITS: return this.renderCharacterTraitChoice()
      case CharacterBuilder.STATUS.DONE:                      return this.done()
      default:                                                return <div>STATUS ERROR!</div>
    }
  }

  renderPlaybookChoice () {
    const { rulebook, builder } = this.state

    return <SwipeableViews enableMouseEvents>
      {/* Add index view */}
      {rulebook.playbooks.map(playbook => <div className={`playbook ${playbook.name} ${(this.state.about === playbook.name) ? 'showing-about' : 'hidden-about'}`}>
        <div className='title'>{playbook.name}</div>
        <div className='subtitle'>{playbook.fields['in a sentence']}</div>
        <div className='actions'>
          <div className='about button' onClick={() => this.toggleAbout(playbook)}>about</div>
          <div className='select button' onClick={() => this.setPlaybook(playbook)}>select</div>
        </div>
        <div className='about text'>
          {playbook.fields.introduction.split('\\n').map((line, key) => <div key={key}>{line}</div>)}
        </div>
      </div>)}
    </SwipeableViews>
  }

  renderCharacterTraitChoice () {
    const choice = this.state.builder.choice

    // if (choice.type.hasOwnProperty('from')) {
    //   const chocieOptions = this.state.builder.getValue(choice.type.from.name)
    //   if (!chocieOptions) {
    //     return ''
    //   }

    //   const renderOptionsChoice = (options) => {
    //     return <div className='from'>
    //       {options.length > MAX_BUTTONS ? <select>{options.map(option => <option>{option}</option>)}</select> : options.map(option => <div className='button'>{option}</div>)}
    //       {choice.free ? <input placeholder='Select another' /> : ''}
    //     </div>
    //   }

    //   if (Array.isArray(chocieOptions[0])) {
    //     return chocieOptions.map(renderOptionsChoice)
    //   } else {
    //     return renderOptionsChoice(chocieOptions)
    //   }

    // }

    // if (choice.type === 'text') {
    //   return <input name={choice.name} placeholder={choice.name} />
    // }

    // if (choice.type === 'long text') {
    //   return <textarea name={choice.name} placeholder={choice.name}/>
    // }

    return JSON.stringify(choice)
  }
}

CharacterCreation.contextType = RulesContext

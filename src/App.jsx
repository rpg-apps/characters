import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import RulesContext from './contexts/rules-context'

import Characters from './components/pages/characters'
import Character from './components/pages/character'
import CharacterCreation from './components/pages/character-creation'
import Gear from './components/pages/gear'
import Moves from './components/pages/moves'
import Bonds from './components/pages/bonds'

function App() {
  return <Router>
    <Switch>
      <Route path='/character/:name/gear' component={Gear}/>
      <Route path='/character/:name/moves' component={Moves}/>
      <Route path='/character/:name/bonds' component={Bonds}/>
      <Route path='/character/:name' component={Character}/>
      <Route path='/new' component={CharacterCreation}/>
      <Route path='/' component={Characters}/>
    </Switch>
  </Router>
}

export default App;

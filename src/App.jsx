import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.scss'

import Home from './components/pages/home'
import Graveyard from './components/pages/home/graveyard'
import New from './components/pages/new'
import Character from './components/pages/character'

import './games/dungeon-world/core.scss'

import { WithAuth } from './components/contexts/auth-context'
import { WithRules } from './components/contexts/rules-context'
import { WithCharacters } from './components/contexts/characters-context'

const DEVELOPMENT_REALM_APP_ID = 'rpg-apps-zbzjw'

function App() {
  return <LoadAllData appId={process.env.REALM_APP_ID || DEVELOPMENT_REALM_APP_ID}>
    <Router>
      <Switch>
        <Route path='/character/:id' component={Character}/>
        <Route path='/new' component={New}/>
        <Route path='/graveyard' component={Graveyard}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  </LoadAllData>
}

function LoadAllData ({ children, appId }) {
  return <WithAuth appId={appId}>
    <WithRules>
      <WithCharacters>
        {children}
      </WithCharacters>
    </WithRules>
  </WithAuth>
}

export default App;

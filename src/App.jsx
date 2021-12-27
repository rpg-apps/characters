import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/pages/home'
import New from './components/pages/new'
import Character from './components/pages/character'

import './App.css'

import './games/dungeon-world/core.scss'

import { WithAuth } from './components/contexts/auth-context'
import { WithRules } from './components/contexts/rules-context'
import { WithCharacters } from './components/contexts/characters-context'

const APP_ID = 'rpg-apps-zbzjw'

function App() {
  return <LoadAllData appId={APP_ID}>
    <Router>
      <Switch>
        <Route path='/character/:id' component={Character}/>
        <Route path='/new' component={New}/>
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

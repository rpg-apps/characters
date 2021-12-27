import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './components/pages/home'
import New from './components/pages/new'
import Character from './components/pages/character'

import './App.css'

import './games/dungeon-world/core.scss'

import { WithAuth } from './components/presentation/auth-context'

const APP_ID = 'rpg-apps-zbzjw'

function App() {
  return <WithAuth appId={APP_ID}>
    <Router>
      <Switch>
        <Route path='/character/:name' component={Character}/>
        <Route path='/new' component={New}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  </WithAuth>
}

export default App;

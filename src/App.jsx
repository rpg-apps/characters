import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './components/pages/login'
import Home from './components/pages/home'
import New from './components/pages/new'
import Character from './components/pages/character'

import './App.css'

import './games/dungeon-world/core.scss'

import auth from './logic/auth'
import AuthContext from './components/presentation/auth-context'

function App() {
  if (!auth.loggedIn()) {
    return <Login />
  }

  return <AuthContext.Provider value={auth.getCurrentUser()}>
    <Router>
      <Switch>
        <Route path='/character/:name' component={Character}/>
        <Route path='/new' component={New}/>
        <Route path='/' component={Home}/>
      </Switch>
    </Router>
  </AuthContext.Provider>
}

export default App;

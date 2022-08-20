import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './home'
import New from './new'
// import Character from './character'

export default function AppRouter () {
  return <Router>
    <Switch>
      {/*<Route path='/character/:id' component={Character}/>*/}
      <Route path='/new' component={New}/>
      <Route path='/' component={Home}/>
    </Switch>
  </Router>
}

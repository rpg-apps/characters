import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Characters from './components/pages/characters'

function App() {
  return
    <Router>
    	<Switch>
    		<Route path='/' component={Characters}/>
    	</Switch>
    </Router>
}

export default App;

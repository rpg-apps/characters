import env from 'react-dotenv'

import './App.scss'
import './css/auth.scss'

import DataProvider from './components/contexts'
import Router from './components/pages'
import Theme from './components/presentation/theme'
import Favicon from './components/presentation/favicon'

const APP_ID = process.env.REACT_APP_REALM_APP_ID

function App() {
  return <Theme>
    <Favicon />
    <DataProvider appId={APP_ID}>
      <Router />
    </DataProvider>
  </Theme>
}

export default App

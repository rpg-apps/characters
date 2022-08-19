import env from 'react-dotenv'

import './App.scss'

import DataProvider from './components/contexts'
import Router from './components/pages'
import Theme from './components/presentation/theme'
import Favicon from './components/presentation/favicon'

const DEVELOPMENT_REALM_APP_ID = 'rpg-apps-test-zyzfm'
const APP_ID = env?.REALM_APP_ID || DEVELOPMENT_REALM_APP_ID

function App() {
  return <Theme>
    <Favicon />
    <DataProvider appId={APP_ID}>
      <Router />
    </DataProvider>
  </Theme>
}

export default App

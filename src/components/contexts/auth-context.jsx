import React, { useState, useEffect, useContext, createContext } from 'react'
import { useHistory } from 'react-router'
import * as Realm from 'realm-web'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export function WithAuth ({ appId, children }) {
  const [app, setApp] = useState(new Realm.App(appId))
  const [currentUser, setCurrentUser] = useState(app.currentUser);
  const history = useHistory()

  useEffect(() => setApp(new Realm.App(appId)), [appId])

  async function logIn(credentials) {
    await app.logIn(credentials)
    setCurrentUser(app.currentUser)
  }

  async function logOut() {
    await app.currentUser?.logOut()
    setCurrentUser(app.currentUser)
  }

  async function signup (email, password) {
    await app.emailPasswordAuth.registerUser({ email, password })
    await logIn(Realm.Credentials.emailPassword(email, password))
    history.push('/new')

  }

  if (!currentUser) {
    return <div className='auth'>
      <Login logIn={logIn} signup={signup} />
      <Signup signup={signup} />
    </div>
  }

  return <AuthContext.Provider value={{ ...app, user: currentUser, logOut }}>{children}</AuthContext.Provider>
}

// TODO validations
// TODO google login
// TODO reset password
function Login ({ logIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginWithEmailAndPassword () {
    return await logIn(Realm.Credentials.emailPassword(email, password))
  }

  return <form>
    <div className='title'>Login</div>
    <label>
      Email:
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
      Password:
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <div className='primary button' onClick={loginWithEmailAndPassword}>Login</div>
  </form>
}

function Signup ({ signup }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  return <form>
    <div className='title'>Signup</div>
    <label>
      Email:
      <input type='text' value={email} onChange={e => setEmail(e.target.value)} />
    </label>
    <label>
      Password:
      <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
    </label>
    <label>
      Confirm password:
      <input type='password' value={confirmation} onChange={e => setConfirmation(e.target.value)} />
    </label>
    <div className='primary button' onClick={() => signup(email, password)}>Signup</div>
  </form>
}

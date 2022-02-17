import React, { useState, useEffect, useContext, createContext } from 'react'
import { useHistory } from 'react-router'
import * as Realm from 'realm-web'

import Form from '../presentation/form'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// TODO validations
// TODO google login
// TODO reset password
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

  async function loginWithEmailAndPassword ({ email, password }) {
    return await logIn(Realm.Credentials.emailPassword(email, password))
  }

  if (!currentUser) {
    return <div className='auth'>
      <Form id='login' title='Login' submitClass='primary' submit={loginWithEmailAndPassword} fields={['email', { name: 'password', type: 'password' }]} />
      <Form id='signup' title='Signup' submitClass='primary' submit={({ email, password, confirmation }) => signup(email, password)} fields={['email', { name: 'password', type: 'password' }, { name: 'confirmation', title: 'Confirm password', type: 'password' }]} />
    </div>
  }

  return <AuthContext.Provider value={{ ...app, user: currentUser, logOut }}>{children}</AuthContext.Provider>
}

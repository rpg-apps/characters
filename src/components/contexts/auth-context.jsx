import React, { useState, useEffect, useContext, createContext } from 'react'
import { useHistory } from 'react-router'
import * as Realm from 'realm-web'
import Form from '../presentation/form'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// TODO client side validations (issue #11: https://github.com/rpg-apps/characters/issues/11)
// TODO google login (issue #2: https://github.com/rpg-apps/characters/issues/2)
// TODO reset password (issue #29: https://github.com/rpg-apps/characters/issues/29)
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
      <Form id='login' title='Login' submitClass='primary' submit={loginWithEmailAndPassword} type={{ email: 'email', password: 'password' }} />
      <Form id='signup' title='Signup' submitClass='primary' submit={({ email, password, confirmation }) => signup(email, password)} type={{ email: 'email', password: 'password', confirmation: 'password' }} />
    </div>
  }

  return <AuthContext.Provider value={{ ...app, user: currentUser, logOut }}>{children}</AuthContext.Provider>
}

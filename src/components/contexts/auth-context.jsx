import React, { useState, useEffect, useCallback, useContext, createContext } from 'react'
import { useHistory } from 'react-router'
import * as Realm from 'realm-web'
import Button from '@mui/material/Button'

import Form from '../presentation/input/form'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)
const GOOGLE_CLIENT_ID = '978183971965-qa08agsv6eid4opprucba6hv4mbq5ovn.apps.googleusercontent.com'

// TODO reset password (issue #29: https://github.com/rpg-apps/characters/issues/29)
export function WithAuth ({ appId, children }) {
  const [app, setApp] = useState(new Realm.App(appId))
  const [currentUser, setCurrentUser] = useState(app.currentUser)
  const [view, setView] = useState()
  const [resetingPassword, setResettingPassword] = useState(false)
  const history = useHistory()

  const initGoogleLogin = useCallback(() => {
    /* global google */
    // google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: loginWithGoogle })
    // google.accounts.id.renderButton(document.getElementById('google-login'), { theme: 'outline', size: 'large' })
  }, [])

  const changeView = useCallback(newView => {
    setView(newView)
    if (newView === 'login') {
      setTimeout(initGoogleLogin)
    }
  }, [setView, initGoogleLogin])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('token') && params.get('tokenId')) {
      setResettingPassword(true)
    }
  }, [setResettingPassword])

  useEffect(() => setApp(new Realm.App(appId)), [appId])

  useEffect(() => changeView('login'), [currentUser, changeView])

  async function logIn(credential) {
    await app.logIn(credential)
    setCurrentUser(app.currentUser)
  }

  async function logOut() {
    await app.currentUser?.logOut()
    setCurrentUser(app.currentUser)
  }

  async function signup ({ email, password }) {
    await app.emailPasswordAuth.registerUser({ email, password })
    await logIn(Realm.Credentials.emailPassword(email, password))
    history.push('/new')
  }

  async function loginWithEmailAndPassword ({ email, password }) {
    return await logIn(Realm.Credentials.emailPassword(email, password))
  }

  async function loginWithGoogle ({ credential }) {
    return await logIn(Realm.Credentials.google(credential))
  }

  async function forgotPassword ({ email }) {
    await app.emailPasswordAuth.sendResetPasswordEmail({ email })
    changeView('login')
  }

  async function resetPassword ({ password }) {
    const params = new URLSearchParams(window.location.search)
    await app.emailPasswordAuth.resetPassword(params.get('token'), params.get('tokenId'), password)
    history.push('/')
  }

  if (resetingPassword) {
    return <div className='auth'>
      <Form id='password-reset' title='Reset Password' submit={resetPassword} type={{ password: 'password', confirmation: 'confirmation' }} />
    </div>
  }

  const views = {
    signup: [
      <Form id='signup' key='signup-form' title='Signup' submit={signup} type={{ email: 'email', password: 'password', confirmation: 'confirmation' }} />,
      <div className='links' key='links'>
        <Button variant='text' onClick={() => changeView('login')}>I already have a user</Button>
      </div>
    ],
    login: [
      <Form id='login' key='login-form' title='Login' submit={loginWithEmailAndPassword} type={{ email: 'email', password: 'password' }} />,
      <div id='google-login' key='google-login'></div>,
      <div className='links' key='links'>
        <Button variant='text' onClick={() => changeView('signup')}>Sign up</Button>
        <Button variant='text' onClick={() => changeView('forgotPassword')}>Forgot my password</Button>
      </div>
    ],
    forgotPassword: [
      <Form id='login' key='login-form' title='Reset Password' submitText='Send Reset Email' submit={forgotPassword} type={{ email: 'email' }} />,
      <div className='links' key='links'>
        <Button variant='text' onClick={() => changeView('signup')}>Let's just signup a new user</Button>
        <Button variant='text' onClick={() => changeView('login')}>I remembered!</Button>
      </div>
    ]
  }

  if (!currentUser) {
    return <div className='auth'>{views[view]}</div>
  }

  return <AuthContext.Provider value={{ ...app, user: currentUser, logOut }}>{children}</AuthContext.Provider>
}

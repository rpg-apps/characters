import React, { useState, useEffect, useContext, createContext } from 'react'
import * as Realm from 'realm-web'
import { FaGoogle } from 'react-icons/fa'

const AuthContext = createContext()

export function useAuth () {
  return useContext(AuthContext)
}

export function WithAuth ({ appId, children }) {
  const [app, setApp] = useState(new Realm.App(appId))
  const [currentUser, setCurrentUser] = useState(app.currentUser);

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupConfirmationPassword, setSignupConfirmationPassword] = useState('')

  useEffect(() => setApp(new Realm.App(appId)), [appId])

  async function logIn(credentials) {
    await app.logIn(credentials)
    setCurrentUser(app.currentUser)
  }

  async function logOut() {
    await app.currentUser?.logOut()
    setCurrentUser(app.currentUser)
  }

  async function loginWithEmailAndPassword () {
    return await logIn(Realm.Credentials.emailPassword(loginEmail, loginPassword))
  }

  async function loginWithGoogle () {
    // const credentials = Realm.Credentials.google()
    // console.log(credentials)
  }

  async function signup () {
    await app.emailPasswordAuth.registerUser({ email: signupEmail, password: signupPassword })
    return await logIn(Realm.Credentials.emailPassword(signupEmail, signupPassword))
  }

  // TODO add validations
  if (!currentUser) {
    return <div className='login'>
      <div className='form'>
        <div className='title'>Login</div>
        <div className='field'>
          <label>Email:</label>
          <input type='text' value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
        </div>
        <div className='field'>
          <label>Password:</label>
          <input type='password' value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
        </div>
        <div className='button' onClick={loginWithEmailAndPassword}>Login</div>
        <div className='google button' onClick={loginWithGoogle}><FaGoogle />Login With Google</div>
      </div>
      <div className='form'>
        <div className='title'>Signup</div>
        <div className='field'>
          <label>Email:</label>
          <input type='text' value={signupEmail} onChange={e => setSignupEmail(e.target.value)} />
        </div>
        <div className='field'>
          <label>Password:</label>
          <input type='password' value={signupPassword} onChange={e => setSignupPassword(e.target.value)} />
        </div>
        <div className='field'>
          <label>Confirm Password:</label>
          <input type='password' value={signupConfirmationPassword} onChange={e => setSignupConfirmationPassword(e.target.value)} />
        </div>
        <div className='button' onClick={signup}>Signup</div>
      </div>
    </div>
  }

  return <AuthContext.Provider value={{ ...app, user: currentUser, logOut }}>{children}</AuthContext.Provider>
}

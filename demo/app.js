import React, { useState } from 'react'
import { GoogleLogout, GoogleLogin, useGoogleLogin } from '../src/index'
// import GoogleLogin, { GoogleLogout } from '../dist/google-login'
// import FontAwesome from 'react-fontawesome';

const clientId = '617246850621-95f9qhmehd380g2df86pjhrqc84n8nij.apps.googleusercontent.com'

const success = response => {
  console.log(response) // eslint-disable-line
}

const error = response => {
  console.error(response) // eslint-disable-line
}

const loading = () => {
  console.log('loading') // eslint-disable-line
}

const logout = () => {
  console.log('logout') // eslint-disable-line
}

const MountTest = () => {
  const [showButton, toggleShow] = useState(true)

  if (showButton) {
    return (
      <GoogleLogin
        onSuccess={res => {
          toggleShow(false)
          success(res)
        }}
        onFailure={error}
        clientId={clientId}
      >
        Auth then Hide button
      </GoogleLogin>
    )
  }

  return <button onClick={() => toggleShow(true)}>show button</button>
}

export default () => {
  const { addScopes } = useGoogleLogin({
    clientId,
    onAddScopesSuccess: success,
    onAddScopesFailure: error
  })

  return (
    <div>
      <MountTest />
      <br />
      <br />
      <GoogleLogin
        clientId={clientId}
        scope="https://www.googleapis.com/auth/analytics"
        onSuccess={success}
        onFailure={error}
        onRequest={loading}
        offline={false}
        approvalPrompt="force"
        responseType="id_token"
        isSignedIn
        theme="dark"
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
      >
        <span>Analytics</span>
      </GoogleLogin>
      <br />
      <br />
      <GoogleLogin
        clientId={clientId}
        scope="https://www.googleapis.com/auth/adwords"
        onSuccess={success}
        onFailure={error}
        onRequest={loading}
        approvalPrompt="force"
        responseType="code"
        // uxMode="redirect"
        // redirectUri="http://google.com"
        // disabled
        // prompt="consent"
        // className='button'
        // style={{ color: 'red' }}
      >
        <span>Adwords</span>
      </GoogleLogin>
      <br />
      <br />
      <GoogleLogin onSuccess={success} onFailure={error} clientId={clientId} />
      <br />
      <br />
      <GoogleLogin theme="dark" onSuccess={success} onFailure={error} clientId={clientId} />
      <br />
      <br />
      <GoogleLogin theme="dark" style={{ background: 'blue' }} onSuccess={success} onFailure={error} clientId={clientId} />
      <br />
      <br />
      <button onClick={() => addScopes('https://www.googleapis.com/auth/calendar')}>Request Additional Scopes</button>
      <br />
      <br />
      <GoogleLogout buttonText="Logout" onLogoutSuccess={logout} />
    </div>
  )
}

# React Google Login

> A Google oAUth Sign-in / Log-in Component for React

## Storybook

[Demo Link](https://anthonyjgrove.github.io/react-google-login/)

## Install
```
npm install react-google-login
```

## How to use
```js
import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
// or
import { GoogleLogin } from 'react-google-login';


const responseGoogle = (response) => {
  console.log(response);
}

ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
  document.getElementById('googleButton')
);
```

## Google button without styling or custom button
```js
ReactDOM.render(
  <GoogleLogin
    clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
    render={renderProps => (
      <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
    )}
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
  document.getElementById('googleButton')
);
```

## Stay Logged in
`isSignedIn={true}` attribute will call `onSuccess` callback on load to keep the user signed in.
```jsx
<GoogleLogin
  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
  onSuccess={responseGoogle}
  isSignedIn={true}
/>
```

## Login Hook
```js
import { useGoogleLogin } from 'react-google-login'

const { signIn, addScopes, loaded } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    onFailure,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    onRequest,
    prompt
  })
```
## Logout Hook
```js
import { useGoogleLogout } from 'react-google-login'

const { signOut, loaded } = useGoogleLogout({
    jsSrc,
    onFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    fetchBasicProfile,
    discoveryDocs,
    uxMode,
    redirectUri,
    scope,
    accessType,
    onLogoutSuccess
  })
```

## onSuccess callback

If responseType is not 'code', callback will return the GoogleAuth object.

If responseType is 'code', callback will return the authorization code that can
be used to retrieve a refresh token from the server.

If you use the hostedDomain param, make sure to validate the id_token (a JSON web token) returned by Google on your backend server:
 1. In the `responseGoogle(response) {...}` callback function, you should get back a standard JWT located at `response.tokenId` or `res.getAuthResponse().id_token`
 2. Send this token to your server (preferably as an `Authorization` header)
 3. Have your server decode the id_token by using a common JWT library such as [jwt-simple](https://github.com/hokaccha/node-jwt-simple) or by sending a GET request to `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=YOUR_TOKEN_HERE`
 4. The returned decoded token should have an `hd` key equal to the hosted domain you'd like to restrict to.


## Logout
Use GoogleLogout button to logout the user from google.

```js
    import { GoogleLogout } from 'react-google-login';
    <GoogleLogout
      clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logout}
    >
    </GoogleLogout>
  ```
## Login Props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientId  |  string  |               REQUIRED               | You can create a clientID by creating a [new project on Google developers website.](https://developers.google.com/identity/sign-in/web/sign-in) |
|    jsSrc     |  string  |https://apis.google.com/js/api.js|URL of the Javascript file normally hosted by Google|
| hostedDomain |  string  |                   -                  |The G Suite domain to which users must belong to sign in|
|     scope    |  string  |             profile email            |                  |
| responseType |  string  |              permission              | Can be either space-delimited 'id_token', to retrieve an ID Token + 'permission' (or 'token'), to retrieve an Access Token, or 'code', to retrieve an Authorization Code.
| accessType   |  string  |              online                  | Can be either 'online' or 'offline'. Use offline with responseType 'code' to retrieve an authorization code for fetching a refresh token  |
|   onSuccess  | function |               REQUIRED               |                  |
|   onFailure  | function |               REQUIRED               |                  |
|   onScriptLoadFailure  | function |         -                  | If defined, will be called when loading the 'google-login' script fails (otherwise onFailure will be called) |
|   onRequest  | function |                   -                  |                  |
|   onAutoLoadFinished  | function |                   -         |                  |
|   buttonText |  string  |             Login with Google        |                  |
|   className  |  string  |                   -                  |                  |
|    style     |  object  |                   -                  |                  |
| disabledStyle|  object  |                   -                  |                  |
|   loginHint  |  string  |                   -                  |                  |
|    prompt    |  string  |                   -                  | Can be 'consent' to force google return refresh token.                |
|     tag      |  string  |                button                |  sets element tag (div, a, span, etc     |
|     type      |  string  |               button                |sets button type (submit || button)     |
|   autoLoad   |  boolean |                 false                |                  |
| fetchBasicProfile | boolean | true                            |                  |
| disabled | boolean | false                            |                  |
| discoveryDocs | - | https://developers.google.com/discovery/v1/using |
| uxMode       |  string  |  popup   | The UX mode to use for the sign-in flow. Valid values are popup and redirect. |
| theme | string | light | If set to `dark` the button will follow the Google brand guidelines for dark. Otherwise it will default to light (https://developers.google.com/identity/branding-guidelines) |
| icon | boolean | true | Show (`true`) or hide (`false`) the Google Icon |
| redirectUri       |  string  |  -   | If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow. The default redirect_uri is the current URL stripped of query parameters and hash fragment. |
| isSignedIn | boolean | false | If true will return GoogleUser object on load, if user has given your app permission |
| render       | function | -                                     | Render prop to use a custom element, use renderProps.onClick |
Google Scopes List: [scopes](https://developers.google.com/identity/protocols/googlescopes)

## Logout Props

|    params    |   value  |             default value            |   description    |
|:------------:|:--------:|:------------------------------------:|:----------------:|
|    clientId  |  string  |               REQUIRED               | You can create a clientID by creating a [new project on Google developers website.](https://developers.google.com/identity/sign-in/web/sign-in) |
|    jsSrc     |  string  | https://apis.google.com/js/api.js | URL of the Javascript file normally hosted by Google |
| hostedDomain |  string  |                   -                  | The G Suite domain to which users must belong to sign in |
|     scope    |  string  |             profile email            |                  |
| accessType   |  string  |              online                  | Can be either 'online' or 'offline'. Use offline with responseType 'code' to retrieve an authorization code for fetching a refresh token |
|   onLogoutSuccess  | function |               REQUIRED               |                  |
|   onFailure  | function |               REQUIRED               |                  |
|   onScriptLoadFailure  | function |         -                  | If defined, will be called when loading the 'google-login' script fails (otherwise onFailure will be called) |
|   buttonText |  string  |             Logout of Google        |                  |
|   className  |  string  |                   -                  |                  |
| disabledStyle|  object  |                   -                  |                  |
|   loginHint  |  string  |                   -                  |                  |
|     tag      |  string  |                button                |  sets element tag (div, a, span, etc     |
|     type      |  string  |               button                |sets button type (submit || button)     |
| fetchBasicProfile | boolean | true                            |                  |
| disabled | boolean | false                            |                  |
| discoveryDocs | - | https://developers.google.com/discovery/v1/using |
| uxMode       |  string  |  popup   | The UX mode to use for the sign-in flow. Valid values are popup and redirect. |
| theme | string | light | If set to `dark` the button will follow the Google brand guidelines for dark. Otherwise it will default to light (https://developers.google.com/identity/branding-guidelines) |
| icon | boolean | true | Show (`true`) or hide (`false`) the Google Icon |
| redirectUri       |  string  |  -   | If using ux_mode='redirect', this parameter allows you to override the default redirect_uri that will be used at the end of the consent flow. The default redirect_uri is the current URL stripped of query parameters and hash fragment. |
| isSignedIn | boolean | false | If true will return GoogleUser object on load, if user has given your app permission |
| render       | function | -                                     | Render prop to use a custom element, use renderProps.onClick |
Google Scopes List: [scopes](https://developers.google.com/identity/protocols/googlescopes)

## onSuccess callback ( w/ offline false)

onSuccess callback returns a GoogleUser object which provides access
to all of the GoogleUser methods listed here: https://developers.google.com/identity/sign-in/web/reference#users .

You can also access the returned values via the following properties on the returned object.

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|   googleId    |  string  |           Google user ID             |
|   tokenId     |  string  |              Token Id                |
|  accessToken  |  string  |            Access Token              |
|   tokenObj    |  object  |        Token details object          |
|  profileObj   |  object  |        Profile details object        |

## onSuccess callback ( w/ offline true)

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|    code       |  object  |           offline token              |

You can also pass child components such as icons into the button component.
```js
  <GoogleLogin
    clientId={'658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com'}
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
  >
    <FontAwesome
      name='google'
    />
    <span> Login with Google</span>
  </GoogleLogin>

```


## onFailure callback

onFailure callback is called when either initialization or a signin attempt fails.

| property name |  value   |             definition               |
|:-------------:|:--------:|:------------------------------------:|
|   error       |  string  |           Error code                 |
|   details     |  string  |      Detailed error description      |


Common error codes include:

| error code | description |
|:----------:|:-----------:|
| `idpiframe_initialization_failed` | initialization of the Google Auth API failed (this will occur if a client doesn't have [third party cookies enabled](https://github.com/google/google-api-javascript-client/issues/260)) |
| `popup_closed_by_user` | The user closed the popup before finishing the sign in flow.|
| `access_denied` | The user denied the permission to the scopes required |
| `immediate_failed` | No user could be automatically selected without prompting the consent flow. |

More details can be found in the official Google docs:
 * [GoogleAuth.then(onInit, onError)](https://developers.google.com/identity/sign-in/web/reference#googleauththenoninit-onerror)
 * [GoogleAuth.signIn(options)](https://developers.google.com/identity/sign-in/web/reference#googleauthsigninoptions)
 * [GoogleAuth.grantOfflineAccess(options)](https://developers.google.com/identity/sign-in/web/reference#googleauthgrantofflineaccessoptions)


## Request Additional Scopes

At sign-in, your application requests "base" scopes such as "profile email". If
the user wants to perform an action that requires additional scopes, your app can
request the user to authorizes only the new scopes from a consent screen.

You can use `addScopes` from `useGoogleLogin` hook to request additional scopes
with `cliendId`, `onAddScopesSuccess`, and `onAddScopesFailure` as shown in the
example. If you want to grant offline access to the new scopes, don't forget to
also include `responseType: 'code'` and `promp: 'consent'`.

NOTE: `addScopes` can only be used if the user is already logged in.

```js
import { useGoogleLogin } from 'react-google-login'

const { addScopes } = useGoogleLogin({
  clientId,
  onAddScopesSuccess,
  onAddScopesSuccess
})
```

More details about this workflow can be found in the official Google docs:
 * [Requesting additional permissions](https://developers.google.com/identity/sign-in/web/incremental-auth)


### onAddScopesSuccess callback

onAddScopesSuccess should be set when you request additional scopes. This callback returns a GoogleUser object which provides access to all of
the GoogleUser properties listed in the above [onSuccess callback section](#onsuccess-callback--w-offline-false).


## onAddScopesFailure callback

onAddScopesSuccess is called when the additional scope request fails.

See properties and common errors in [onFailure callback section](#onfailure-callback).


## Dev Server
```
npm run start
```
Default dev server runs at localost:8080 in browser.
You can set IP and PORT in webpack.config.dev.js

## Run Tests
```
npm run test:watch
```

## Production Bundle
```
npm run bundle
```

## Deploy Storybook
```
npm run deploy-storybook
```

##### Checkout my other login: [React Instagram Login](https://github.com/anthonyjgrove/react-instagram-login)

##### Checkout keppelen's [React Facebook Login](https://github.com/keppelen/react-facebook-login)

### Follow me on Twitter: [@anthonyjgrove](https://twitter.com/anthonyjgrove)

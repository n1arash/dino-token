import 'regenerator-runtime/runtime'
import React from 'react'
import './index.css'

import getConfig from './config'
import { initContract } from './utils'
const { contractName } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const [{accountId, contract, walletConnection}, setInitContract] = React.useState({})
  const [isSignedIn, setIsSignedIn] = React.useState(false)
  React.useEffect(
    () => {
      async function init() {

        const { accountId, contract, walletConnection } = await initContract()
        setInitContract({accountId, contract, walletConnection})
        setIsSignedIn(walletConnection.isSignedIn())
      }
      init()
    },
    [setInitContract, setIsSignedIn]
  )

  function logout() {
  walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
  }

  function login() {
    walletConnection.requestSignIn(contractName)
  }


  // if not signed in, return early with sign-in prompt
  if (!isSignedIn) {
    return (
      <main>
        <h1>Welcome to Blue Dino Token</h1>
        <p>
          To make use of the NEAR blockchain, you need to sign in. The button
          below will sign you in using NEAR Wallet.
        </p>
        <p style={{ textAlign: 'center', marginTop: '2.5em' }}>
          <button onClick={login}>Sign in</button>
        </p>
      </main>
    )
  }
  return (
    <main>
      <button onClick={logout}>Logout</button>
    </main>
  )

}

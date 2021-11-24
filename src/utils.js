import { connect, Contract, keyStores, WalletConnection } from 'near-api-js'
import getConfig from './config'
import Big from 'big.js'
export const nearConfig = getConfig(process.env.NODE_ENV || 'development')

// Initialize contract & set global variables
export async function initContract() {
  // Initialize connection to the NEAR testnet
  const near = await connect(Object.assign({ deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } }, nearConfig))

  // Initializing Wallet based Account. It can work with NEAR testnet wallet that
  // is hosted at https://wallet.testnet.near.org
  const walletConnection = new WalletConnection(near)

  // Getting the Account ID. If still unauthorized, it's just empty string
  const accountId = walletConnection.getAccountId()

  // Initializing our contract APIs by contract name and configuration
  const contract = await new Contract(walletConnection.account(), nearConfig.contractName, {
    // View methods are read only. They don't modify the state, but usually return some value.
    viewMethods: ['ft_balance_of', 'storage_balance_of'],
    // Change methods can modify the state. But you don't receive the returned value when called.
    changeMethods: ['storage_deposit', 'buy_tokens', 'send_tokens'],
  })
  return { accountId, contract, walletConnection }
}

export function logout() {
  window.walletConnection.signOut()
  // reload page
  window.location.replace(window.location.origin + window.location.pathname)
}

export function login() {
  // Allow the current app to make calls to the specified contract on the
  // user's behalf.
  // This works by creating a new access key for the user's account and storing
  // the private key in localStorage.
  window.walletConnection.requestSignIn(nearConfig.contractName)
  window.contract.storage_deposit({
    
  },'0.00125')

}

export const ONE_YOCTO_NEAR = "1";
export const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();
export const ONE_NEAR = Big(1).times(10 ** 24).toFixed();
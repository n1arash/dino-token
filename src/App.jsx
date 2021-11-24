import "regenerator-runtime/runtime";
import React from "react";
import "./App.css";
import "./index.css";
import meme from "./assets/image.jpg";
import getConfig from "./config";
import { initContract } from "./utils";
import TransferPage from "./Transfer";
import Header from "./Header";
import Footer from "./Footer";
const { contractName } = getConfig(process.env.NODE_ENV || "development");

export default function App() {
  const [{ accountId, contract, walletConnection }, setInitContract] =
    React.useState({});
  const [isSignedIn, setIsSignedIn] = React.useState(false);
  React.useEffect(() => {
    async function init() {
      const { accountId, contract, walletConnection } = await initContract();
      setInitContract({ accountId, contract, walletConnection });
      setIsSignedIn(walletConnection.isSignedIn());
    }
    init();
  }, [setInitContract, setIsSignedIn]);

  function logout() {
    walletConnection.signOut();
    // reload page
    window.location.replace(window.location.origin + window.location.pathname);
  }

  function login() {
    walletConnection.requestSignIn(contractName);
  }

  // if not signed in, return early with sign-in prompt
  if (!isSignedIn) {
    return (
      <>
        <Header
          isSignedIn={isSignedIn}
          logout={logout}
          login={login}
          accountId={accountId}
        />
        <main>
          <div className="jumbotron">
            <div className="container">
              <div className="row">
                <h1 className="jumbotron-head" style={{ textAlign: "center" }}>
                  Blue Dino Token
                </h1>
                <p className="jumbotron-text"></p>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row center-column">
              <h2>What is a meme Token?</h2>
              <p>
                A meme coin is a cryptocurrency that originated from an Internet
                meme or has some other humorous characteristic. The term is
                often dismissive, comparing the value or performances of those
                cryptocurrencies to that of mainstream ones.
              </p>
              <div className="center-column">
                <p>Login to Transfer your Blue Dino Token</p>
                <button className="button button-primary" onClick={login}>
                  Login
                </button>
              </div>
              <div className="center-column">
                <img src={meme} alt="blue dino" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  return (
    <>
      <Header
        isSignedIn={isSignedIn}
        logout={logout}
        login={login}
        accountId={accountId}
      />
      <TransferPage contract={contract} accountId={accountId} />
      <Footer />
    </>
  );
}

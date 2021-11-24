import * as React from "react";
import logo from "./assets/logo.svg";

export default function Header({
  login,
  logout,
  accountId,
  isSignedIn,
  childern,
}) {
  return (
    <>
      <header className="header">
        <div className="center-row row">
          <div className="three columns">
            {isSignedIn ? (
              <button className="button button-primary" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="button" onClick={login}>
                Login
              </button>
            )}
          </div>

          <div className="six columns">
            <div className="center-column">
              <img
                src={logo}
                width="64px"
                height="64px"
                alt="Kiwi standing on oval"
              />
            </div>
          </div>
          <div className="three columns">
            <h4>
              <a
                target="_blank"
                href={`https://explorer.testnet.near.org/accounts/${accountId}`}
              >
                {accountId}
              </a>
            </h4>
          </div>
        </div>
      </header>

      {childern}
    </>
  );
}

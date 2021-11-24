import * as React from "react";
import { BOATLOAD_OF_GAS, ONE_YOCTO_NEAR } from "./utils";
import Big from "big.js";

export default function TransferPage({ accountId, contract }) {
  const [nearAddress, setNearAddress] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [userBalance, setUserBalance] = React.useState(0);
  const [storageBalance, setStorageBalance] = React.useState(null);
  React.useEffect(() => {
    const getStorageDeposit = async () => {
      const storage = await contract.storage_balance_of({
        account_id: accountId,
      });
      setStorageBalance(storage);
    };
    const getBalance = async () => {
      const balance = await contract.ft_balance_of({
        account_id: accountId,
      });
      setUserBalance(balance);
    };
    console.log(contract);
    getBalance();
    getStorageDeposit();
  }, [accountId, setUserBalance, contract]);

  async function depositStorage(to) {
    if (storageBalance == null) {
      await contract.storage_deposit(
        { account_id: to },
        "200000000000000",
        Big(0.00125)
          .times(10 ** 24)
          .add(ONE_YOCTO_NEAR)
          .toFixed()
      );
    }
  }
  async function transferDino(to, amount) {
    if (storageBalance == null) {
      await depositStorage(to);
    } else {
      await contract.send_tokens(
        {
          receiver_id: to,
          amount,
        },
        "200000000000000",
        Big(0.00125)
          .times(10 ** 24)
          .add(ONE_YOCTO_NEAR)
          .toFixed()
      );
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    transferDino(nearAddress, amount);
  }

  async function buyDino(to) {
    if (storageBalance == null) {
      await depositStorage(to);
    } else {
      await contract.buy_tokens(
        {
          account_id: accountId,
          amount: amount,
        },
        BOATLOAD_OF_GAS,
        ONE_YOCTO_NEAR
      );
    }
  }
  async function onBuySubmit(e) {
    e.preventDefault();
    await buyDino(accountId);
  }

  function onAddressChange(e) {
    setNearAddress(e.target.value);
  }

  function onAmountChange(e) {
    setAmount(e.target.value);
  }

  return (
    <main className="container transfer-main">
      <div className="transfer-card">
        <h1>Transfer Dino Token</h1>
        <h5>Balance: {userBalance} DINO</h5>
        <form onSubmit={onSubmit} className="transfer-form">
          <div className="row">
            <label htmlFor="exampleEmailInput">
              Near wallet address (example: you.near){" "}
            </label>
            <input
              onChange={onAddressChange}
              className="u-full-width"
              name="amount"
              type="text"
              placeholder="you.near"
            />
          </div>
          <div className="row">
            <label htmlFor="exampleEmailInput">DINO Transfer Amount:</label>
            <input
              onChange={onAmountChange}
              className="u-full-width"
              name="amount"
              type="number"
              placeholder="100"
            />
          </div>
          <br />
          <div className="row center-row">
            <input className="button-primary" type="submit" value="Transfer" />
          </div>
        </form>
      </div>
      <div className="transfer-card">
        <h5>Get 100 FREE Dino with Portion of NEAR</h5>
        <p>
          If it's first transaction on you have to do Storage Deposit for DINO
          Token, so try again when you got back from storage deposit
          transaction.
        </p>
        <form onSubmit={onBuySubmit} className="transfer-form">
          <div className="row center-row">
            <input className="button-primary" type="submit" value="GIMMEEEE!" />
          </div>
        </form>
      </div>
    </main>
  );
}

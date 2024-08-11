import React, { useEffect, useState } from 'react';
import { sendToken } from '../../utils/TransactionUtils';
import { Account } from '../../models/Account';
import AccountTransactions from './AccountTransactions';
import { Connection, PublicKey } from '@solana/web3.js';
import './Account.css';

interface AccountDetailProps {
  account: Account;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
  const [destinationAddress, setDestinationAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState<string | number>(account.balance ?? 0);
  const [networkResponse, setNetworkResponse] = useState<{ status: null | 'pending' | 'complete' | 'error', message: string | React.ReactElement }>({
    status: null,
    message: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
      if (account.address) {
        const publicKey = new PublicKey(account.address);
        let accountBalance = await connection.getBalance(publicKey);
        setBalance((accountBalance / 1_000_000_000).toFixed(2)); // Convert lamports to SOL
      }
    };
    fetchData();
  }, [account.address]);

  function handleDestinationAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    setDestinationAddress(event.target.value);
  }

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number.parseFloat(event.target.value));
  }

  async function transfer() {
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    try {
      // const signature = await sendToken(destinationAddress, amount);
      
      const signature = 'dummy_signature';

      setNetworkResponse({
        status: 'complete',
        message: <p>Transfer complete! <a href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`} target="_blank" rel="noreferrer">View transaction</a></p>,
      });
    } catch (error: any) {
      console.error({ error });
      setNetworkResponse({
        status: 'error',
        message: error.message || JSON.stringify(error),
      });
    }
  }

  return (
    <div className='AccountDetail container'>
      <h4>
        Address: <a href={`https://explorer.solana.com/address/${account.address}?cluster=devnet`} target="_blank" rel="noreferrer">
          {account.address}
        </a><br />
        Balance: {balance} SOL
      </h4>

      <div className="form-group">
        <label>Destination Address:</label>
        <input
          className="form-control"
          type="text"
          value={destinationAddress}
          onChange={handleDestinationAddressChange}
        />
      </div>

      <div className="form-group">
        <label>Amount:</label>
        <input
          className="form-control"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>

      <button
        className="btn btn-primary"
        type="button"
        onClick={transfer}
        disabled={!amount || networkResponse.status === 'pending'}
      >
        Send {amount} SOL
      </button>

      {networkResponse.status &&
        <>
          {networkResponse.status === 'pending' && <p>Transfer is pending...</p>}
          {networkResponse.status === 'complete' && <p>{networkResponse.message}</p>}
          {networkResponse.status === 'error' && <p>Error occurred while transferring tokens: {networkResponse.message}</p>}
        </>
      }

      <AccountTransactions account={account} />
    </div>
  );
}

export default AccountDetail;

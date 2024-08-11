import React, { useCallback, useEffect, useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { Account } from '../../models/Account';
import { devnet } from '../../models/Chain';

type AccountTransactionsProps = {
  account: Account;
};

interface SolanaTransaction {
  signature: string;
}

const AccountTransactions: React.FC<AccountTransactionsProps> = ({ account }) => {
  const [transactions, setTransactions] = useState<SolanaTransaction[]>([]);
  const [networkResponse, setNetworkResponse] = useState<{
    status: null | 'pending' | 'complete' | 'error';
    message: string;
  }>({
    status: null,
    message: '',
  });

  const getTransactions = useCallback(() => {
    setNetworkResponse({
      status: 'pending',
      message: '',
    });

    if (!account.address) {
      console.error('Account address is undefined');
      setNetworkResponse({
        status: 'error',
        message: 'Account address is undefined',
      });
      return;
    }

    const connection = new Connection(devnet.rpcUrl, 'confirmed');
    connection
      .getConfirmedSignaturesForAddress2(new PublicKey(account.address))
      .then((signatures) => {
        setTransactions(signatures.map((sig) => ({ signature: sig.signature })));
      })
      .catch((error) => {
        console.error({ error });
        setNetworkResponse({
          status: 'error',
          message: JSON.stringify(error),
        });
      })
      .finally(() => {
        setNetworkResponse({
          status: 'complete',
          message: '',
        });
      });
  }, [account.address]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);

  function shortenAddress(signature: string): React.ReactNode {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="AccountTransactions">
      <h2>Transactions</h2>
      <div className="TransactionsMetaData">
        {networkResponse.status === 'complete' && transactions.length === 0 && (
          <p>No transactions found for this address</p>
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={getTransactions}
          disabled={networkResponse.status === 'pending'}
        >
          Refresh Transactions
        </button>
        {networkResponse.status && (
          <>
            {networkResponse.status === 'pending' && <p className="text-info">Loading transactions...</p>}
            {networkResponse.status === 'error' && (
              <p className="text-danger">Error occurred while fetching transactions: {networkResponse.message}</p>
            )}
          </>
        )}
      </div>
      <table className="table table-striped overflow-auto">
        <thead>
          <tr>
            <th>Signature</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.signature}>
              <td>
                <a
                  href={`${devnet.blockExplorerUrl}/tx/${transaction.signature}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shortenAddress(transaction.signature)}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountTransactions;

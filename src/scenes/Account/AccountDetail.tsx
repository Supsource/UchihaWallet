// AccountDetail.tsx
import React from 'react';
import { Account } from '../../models/Account';

interface AccountDetailProps {
  account: Account;
}

const AccountDetail: React.FC<AccountDetailProps> = ({ account }) => {
  return (
    <div>
      <h2>Account Details</h2>
      {/* Render other account details here */}
    </div>
  );
};

export default AccountDetail;

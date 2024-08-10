import { generateKeys } from '../../utils/AccountUtils';
import React from 'react';

const AccountCreate: React.FC = () => {
    const createAccount = () => {
        const keys = generateKeys();
        console.log({keys});

    };

    return (
        <div>
            <button onClick={createAccount}>
                Create Account
            </button>
        </div>
    );
};

export default AccountCreate;
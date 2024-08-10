import { generateKeys } from '../../utils/AccountUtils';
import React from 'react';

const AccountCreate: React.FC = () => {

    const [showSeedInput, setShowSeedInput] = React.useState(false);
    const [seedPhrase, setSeedPhrase] = React.useState('');

    const createAccount = () => {
        const keys = generateKeys();
        console.log({keys});
    };

    const recoverAccount = () =>{
        setShowSeedInput(true);
    }

    const handelSeedPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeedPhrase(event.target.value);
    }

    const handelSeedPhraseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keys = generateKeys(seedPhrase);
        console.log({keys});
    }

    return (
        <div>
            <button onClick={createAccount}>Create Account</button>
            <button onClick={recoverAccount}>Recover Account</button>
            {showSeedInput && (
                <form onSubmit={handelSeedPhraseSubmit}>
                <label>
                    Seed Phrase: 
                    <input type="text" value={seedPhrase} onChange={handelSeedPhraseChange} />
                </label>
                <input type="submit" value="submit"/>
                </form>
            )}
        </div>
    );
};

export default AccountCreate;

import { generateKeys } from '../../utils/AccountUtils';
import React from 'react';

const AccountCreate: React.FC = () => {

    const [showSeedInput, setShowSeedInput] = React.useState(false);
    const [seedPhrase, setSeedPhrase] = React.useState('');

    const createAccount = () => {
        const keys = generateKeys();
        console.log({ keys });
    };

    const recoverAccount = () => {
        setShowSeedInput(true);
    }

    const handleSeedPhraseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSeedPhrase(event.target.value);
    }

    const handleSeedPhraseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const keys = generateKeys(seedPhrase);
        console.log({ keys });
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-around">
                <button className="btn btn-primary" onClick={createAccount}>Create Account</button>
                <button className="btn btn-secondary" onClick={recoverAccount}>Recover Account</button>
            </div>
            {showSeedInput && (
                <form onSubmit={handleSeedPhraseSubmit} className="mt-4">
                    <div className="form-group">
                        <label htmlFor="seedPhraseInput">Seed Phrase:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="seedPhraseInput"
                            value={seedPhrase}
                            onChange={handleSeedPhraseChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success mt-2">Submit</button>
                </form>
            )}
        </div>
    );
};

export default AccountCreate;

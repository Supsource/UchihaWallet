import { Keypair } from '@solana/web3.js';
import { Account } from '../models/Account';


export const generateAccount = (recoveryPhrase?: string): { account: Account } => {
  let keypair: Keypair;

  if (recoveryPhrase) {
    const seed = Uint8Array.from(Buffer.from(recoveryPhrase, 'hex')); // Assuming hex encoding
    if (seed.length < 32) {
      throw new Error('Recovery phrase is too short. It must be at least 32 bytes.');
    }
    keypair = Keypair.fromSeed(seed.slice(0, 32));
  } else {
    // Generate a new keypair
    keypair = Keypair.generate();
  }

  return {
    account: {
      publicKey: keypair.publicKey.toBase58(),
      secretKey: keypair.secretKey,
    },
  };
};


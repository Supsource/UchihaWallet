import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';
import { CHAINS_CONFIG, devnet } from '../models/Chain';

export async function sendToken(
  amount: number,
  from: string,
  to: string,
  privateKey: string,
) {
  const connection = new Connection(devnet.rpcUrl, 'confirmed');
  const sender = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(privateKey)));
  const recipient = new PublicKey(to);

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: sender.publicKey,
      toPubkey: recipient,
      lamports: amount * LAMPORTS_PER_SOL, // Convert SOL to lamports
    })
  );

  const signature = await connection.sendTransaction(transaction, [sender]);
  await connection.confirmTransaction(signature, 'confirmed');

  return { signature };
}

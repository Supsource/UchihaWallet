import { Connection, PublicKey } from '@solana/web3.js';
import { devnet } from '../models/Chain';

export class TransactionService {
  static async getTransactions(address: string) {
    const connection = new Connection(devnet.rpcUrl, 'confirmed');
    const publicKey = new PublicKey(address);
    const signatures = await connection.getConfirmedSignaturesForAddress2(publicKey);
    return signatures;
  }
}

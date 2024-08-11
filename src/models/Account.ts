export interface Account {
    publicKey: string;
    secretKey: Uint8Array;
    privateKey?: string;
    address?: string;
    balance?: number;
  }
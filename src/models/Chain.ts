export type Chain = {
  chainId: string; 
  name: string;
  blockExplorerUrl: string;
  rpcUrl: string;
};

export const mainnet: Chain = {
  chainId: 'mainnet-beta',
  name: 'Solana Mainnet Beta',
  blockExplorerUrl: 'https://explorer.solana.com',
  rpcUrl: 'https://api.mainnet-beta.solana.com',
};

export const devnet: Chain = {
  chainId: 'devnet',
  name: 'Solana Devnet',
  blockExplorerUrl: 'https://explorer.solana.com?cluster=devnet',
  rpcUrl: 'https://api.devnet.solana.com',
};

export const testnet: Chain = {
  chainId: 'testnet',
  name: 'Solana Testnet',
  blockExplorerUrl: 'https://explorer.solana.com?cluster=testnet',
  rpcUrl: 'https://api.testnet.solana.com',
};

export const CHAINS_CONFIG = {
  [mainnet.chainId]: mainnet,
  [devnet.chainId]: devnet,
  [testnet.chainId]: testnet,
};

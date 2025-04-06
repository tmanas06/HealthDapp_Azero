import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

declare module '*.json' {
  const value: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    abi: any[];
    bytecode?: string;
  };
  export default value;
}

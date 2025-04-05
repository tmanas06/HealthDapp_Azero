interface SubWalletAccount {
    address: string;
    name?: string;
    source: string;
    type: string;
  }
  
  interface SubWalletProvider {
    enable: (originName?: string) => Promise<SubWalletInjected>; // Modified to reflect actual structure
    accounts: {
      get: () => Promise<SubWalletAccount[]>;
    };
  }
  
  interface InjectedWeb3 {
    subwallet?: SubWalletProvider;
  }
  
  // If SubWallet is also accessible directly via window.SubWallet
  interface Window {
    injectedWeb3?: InjectedWeb3;
    SubWallet?: SubWalletProvider;
  }
  
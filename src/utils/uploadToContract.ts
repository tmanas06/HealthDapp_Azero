import { ethers } from 'ethers';
import ABI from '../abi/MedicalFileVaultABI.json';

const CONTRACT_ADDRESS = '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8';
const TARGET_CHAIN_ID = 2039; // Aleph Zero Testnet EVM
const RPC_URLS = [
  'https://rpc.alephzero-testnet.gelato.digital',
  'https://alephzero-sepolia.drpc.org'
];

declare global {
  interface SubWalletProvider {
    isSubWallet?: boolean;
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  }

  interface Window {
    SubWallet?: SubWalletProvider;
  }
}

async function ensureCorrectNetwork(subWallet: SubWalletProvider) {
  try {
    // Get current chain ID
    const currentChainIdHex = await subWallet.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(currentChainIdHex as string, 16);

    if (currentChainId === TARGET_CHAIN_ID) return;

    // Try to switch network
    try {
      await subWallet.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${TARGET_CHAIN_ID.toString(16)}` }]
      });
    } catch (switchError) {
      // 4902: Chain not added to wallet
      if ((switchError as { code: number }).code === 4902) {
        await subWallet.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: `0x${TARGET_CHAIN_ID.toString(16)}`,
            chainName: 'Aleph Zero Testnet EVM',
            nativeCurrency: {
              name: 'AZERO',
              symbol: 'AZERO',
              decimals: 18
            },
            rpcUrls: RPC_URLS,
            blockExplorerUrls: ['https://test.azero.dev/#/explorer']
          }]
        });
      } else {
        throw switchError;
      }
    }

    // Verify network switch
    const newChainIdHex = await subWallet.request({ method: 'eth_chainId' });
    if (parseInt(newChainIdHex as string, 16) !== TARGET_CHAIN_ID) {
      throw new Error('User rejected network switch');
    }
  } catch (error) {
    throw new Error(`Network switch failed: ${(error as Error).message}`);
  }
}

export const uploadToContract = async (cid: string, fileName: string) => {
  try {
    const subWallet = window?.SubWallet;
    if (!subWallet?.isSubWallet) {
      throw new Error('❌ SubWallet extension not detected or incompatible version.');
    }

    // Ensure connection to correct network
    await ensureCorrectNetwork(subWallet);

    // Enable wallet and retrieve accounts
    const accounts = await subWallet.request({ method: 'eth_requestAccounts' });
    if (!(Array.isArray(accounts) && accounts.length)) {
      throw new Error('❌ No authorized accounts found.');
    }

    // Create provider and signer
    const provider = new ethers.BrowserProvider(subWallet);
    const signer = await provider.getSigner();

    // Initialize contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

    // Execute transaction
    const tx = await contract.uploadFile(cid, fileName);
    console.log('📤 Transaction submitted with hash:', tx.hash);

    const receipt = await tx.wait();
    console.log('✅ Transaction confirmed in block:', receipt.blockNumber);

    return {
      success: true,
      hash: tx.hash,
      blockNumber: receipt.blockNumber,
      networkId: TARGET_CHAIN_ID
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error('🚨 Upload failed:', error.message);
    throw new Error(`Contract interaction failed: ${error.message}`);
  }
};

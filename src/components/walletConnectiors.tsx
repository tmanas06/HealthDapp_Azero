// import { ethers } from 'ethers';
// import { useState } from 'react';
// import type { Contract, providers } from 'ethers';
// import HealthRecordsABI from '../contracts/HealthRecords.json';

// interface HealthRecordsContract extends Contract {
//   getPatient: (id: number) => Promise<any>;
//   createPatient: (
//     name: string,
//     age: number,
//     gender: string,
//     medicalHistory: string
//   ) => Promise<any>;
// }

// const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || 'YOUR_CONTRACT_ADDRESS';

// export const useWalletConnector = () => {
//   const [account, setAccount] = useState<string>('');
//   const [contract, setContract] = useState<HealthRecordsContract | null>(null);
//   const [error, setError] = useState<string>('');

//   const connectWallet = async () => {
//     try {
//       if (!(window as any).ethereum) {
//         throw new Error('MetaMask not installed');
//       }

//       const accounts = await (window as any).ethereum.request({ 
//         method: 'eth_requestAccounts' 
//       });
      
//       const provider = new ethers.BrowserProvider((window as any).ethereum);
//       const signer = await provider.getSigner();
      
//       const healthContract = new ethers.Contract(
//         contractAddress,
//         HealthRecordsABI.abi,
//         signer
//       ) as HealthRecordsContract;

//       setAccount(accounts[0]);
//       setContract(healthContract);
      
//       // Store connection in localStorage
//       localStorage.setItem('walletConnected', 'true');
//       localStorage.setItem('account', accounts[0]);
//       localStorage.setItem('contractAddress', contractAddress);

//       return { account: accounts[0], contract: healthContract };
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     }
//   };

//   const disconnectWallet = () => {
//     setAccount('');
//     setContract(null);
//     localStorage.removeItem('walletConnected');
//     localStorage.removeItem('account');
//     localStorage.removeItem('contractAddress');
//   };

//   const checkConnection = async () => {
//     if (localStorage.getItem('walletConnected')) {
//       try {
//         await connectWallet();
//       } catch (err) {
//         disconnectWallet();
//       }
//     }
//   };

//   return {
//     account,
//     contract,
//     error,
//     connectWallet,
//     disconnectWallet,
//     checkConnection
//   };
// };

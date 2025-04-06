import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

import { Wallet, UserCircle2, Stethoscope, ChevronDown } from "lucide-react";

import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from "@/components/ui/select";

import { web3Enable, web3Accounts } from "@polkadot/extension-dapp";

interface WalletAccount {
  address: string;
  type: "patient" | "doctor";

  walletProvider: "phantom" | "subwallet" | "metamask";
}

// ====== Wallet Connectors ======
const connectPhantomWallet = async (): Promise<string | null> => {
  interface SolanaProvider {
    isPhantom: boolean;
    connect: () => Promise<{ publicKey: { toString: () => string } }>;
  }

  const provider = (window as Window & { solana?: SolanaProvider }).solana;
  if (!provider || !provider.isPhantom) {
    toast({
      title: "Phantom Not Found",
      description: "Please install Phantom wallet extension.",
      variant: "destructive",
    });
    return null;
  }
  const resp = await provider.connect();
  return resp.publicKey.toString();
};


  walletProvider: "subwallet";
}

// ====== Wallet Connectors ======

const connectSubWallet = async (): Promise<string | null> => {
  const extensions = await web3Enable("HealthChain Sentinel");
  if (extensions.length === 0) {
    toast({
      title: "SubWallet Not Found",
      description: "Please install SubWallet extension.",
      variant: "destructive",
    });
    return null;
  }

  const accounts = await web3Accounts();
  if (!accounts.length) {
    toast({
      title: "No SubWallet Account",
      description: "No accounts found in SubWallet.",
      variant: "destructive",
    });
    return null;
  }

  return accounts[0].address;

};

const connectMetaMask = async (): Promise<string | null> => {
  interface EthereumProvider {
    isMetaMask?: boolean;
    request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  }

  const { ethereum } = window as unknown as { ethereum?: EthereumProvider };
  if (!ethereum || !ethereum.isMetaMask) {
    toast({
      title: "MetaMask Not Found",
      description: "Please install MetaMask wallet extension.",
      variant: "destructive",
    });
    return null;
  }

  const accounts = await ethereum.request({ method: "eth_requestAccounts" });
  return accounts?.[0] || null;

};

// ====== Main Component ======
export function WalletConnector() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");

  const [walletProvider, setWalletProvider] = useState<"phantom" | "subwallet" | "metamask">("subwallet");

  const [walletProvider, setWalletProvider] = useState<"subwallet">("subwallet");


  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      let address: string | null = null;


      switch (walletProvider) {
        case "phantom":
          address = await connectPhantomWallet();
          break;
        case "subwallet":
          address = await connectSubWallet();
          break;
        case "metamask":
          address = await connectMetaMask();
          break;
        default:
          break;

      if (walletProvider === "subwallet") {
        address = await connectSubWallet();

      }

      if (!address) throw new Error("Connection failed");

      const account: WalletAccount = {
        address,
        type: activeTab,
        walletProvider,
      };

      localStorage.setItem("walletAccount", JSON.stringify(account));

      toast({
        title: "Wallet Connected",
        description: `Connected as ${activeTab} via ${walletProvider}: ${address.slice(0, 6)}...${address.slice(-4)}`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Could not connect to wallet. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Connect Wallet</CardTitle>
        <CardDescription className="text-center">
          Connect your blockchain wallet to access HealthChain Sentinel
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="patient" className="w-full" onValueChange={(value) => setActiveTab(value as "patient" | "doctor")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patient">
              <UserCircle2 className="mr-2 h-4 w-4" />
              Patient
            </TabsTrigger>
            <TabsTrigger value="doctor">
              <Stethoscope className="mr-2 h-4 w-4" />
              Doctor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient" className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
              <h3 className="font-medium flex items-center text-blue-700">
                <UserCircle2 className="mr-2 h-4 w-4" />
                Patient Access
              </h3>
              <p className="text-sm text-blue-600 mt-1">
                Connect your wallet to access your medical records and control who can view your health data.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="doctor" className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-green-50 border border-green-100">
              <h3 className="font-medium flex items-center text-green-700">
                <Stethoscope className="mr-2 h-4 w-4" />
                Healthcare Provider Access
              </h3>
              <p className="text-sm text-green-600 mt-1">
                Connect your wallet to access patient records you have permission to view and add medical data.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Wallet Type Selector */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Wallet</label>

          <Select value={walletProvider} onValueChange={(val: "phantom" | "subwallet" | "metamask") => setWalletProvider(val)}>

          <Select value={walletProvider} onValueChange={(val: "subwallet") => setWalletProvider(val)}>

            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>

              <SelectItem value="subwallet">SubWallet (Polkadot)</SelectItem>
              <SelectItem value="phantom">Phantom (Solana)</SelectItem>
              <SelectItem value="metamask">MetaMask (Ethereum)</SelectItem>

              <SelectItem value="subwallet">SubWallet</SelectItem>

            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          onClick={handleConnect}
          className="w-full"
          disabled={isConnecting}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      </CardFooter>
    </Card>
  );
}

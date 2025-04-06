import React, { useState, useEffect } from "react";
import {
  Activity,
  Image,
  User,
  Wallet,
  Lock,
  ShieldCheck,
  Send,
  ArrowDownCircle,
  Settings,
  BadgeCheck,
  LayoutDashboard,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Profile() {
  const navigate = useNavigate();

  const [walletData, setWalletData] = useState({
    address: "",
    type: "",
    walletProvider: "",
    isConnected: false,
    portfolioValue: "$0.00",
    recentTransactions: 0,
    gasFee: "$0.00 (24h)",
    tokens: [],
    nfts: [],
    activity: [],
    staking: [],
    dao: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWalletData = async () => {
      try {
        setIsLoading(true);
        const walletAccountStr = localStorage.getItem("walletAccount");
        if (!walletAccountStr) {
          toast({
            title: "No wallet connected",
            description: "Please connect your wallet first.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }
        const walletAccount = JSON.parse(walletAccountStr);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const mockData = {
          address: walletAccount.address,
          type: walletAccount.type,
          walletProvider: walletAccount.walletProvider,
          isConnected: true,
          portfolioValue:
            walletAccount.type === "doctor" ? "$15,750.45" : "$8,324.67",
          recentTransactions: walletAccount.type === "doctor" ? 8 : 3,
          gasFee: "$32.18 (24h)",
          tokens: [
            { name: "AZERO", balance: "145.5", value: "$4,365" },
            { name: "DOT", balance: "85.3", value: "$1,280" },
            {
              name: walletAccount.type === "doctor" ? "MEDIC" : "HEALTH",
              balance: walletAccount.type === "doctor" ? "500" : "120",
              value: walletAccount.type === "doctor" ? "$2,500" : "$600",
            },
          ],
          nfts:
            walletAccount.type === "doctor"
              ? [
                  { id: "#D5678", collection: "DocCert" },
                  { id: "#M1234", collection: "MedLicense" },
                  { id: "#H7890", collection: "HospitalBadge" },
                ]
              : [
                  { id: "#P1234", collection: "PatientID" },
                  { id: "#I5678", collection: "InsuranceProof" },
                ],
          activity:
            walletAccount.type === "doctor"
              ? [
                  {
                    type: "Record Update",
                    description: "Updated patient #123's records",
                    iconColor: "text-blue-500",
                  },
                  {
                    type: "Authorization",
                    description: "Received access to patient #456",
                    iconColor: "text-green-500",
                  },
                  {
                    type: "Certificate",
                    description: "Renewed medical license NFT",
                    iconColor: "text-purple-500",
                  },
                ]
              : [
                  {
                    type: "Record Access",
                    description: "Granted access to Dr. Smith",
                    iconColor: "text-blue-500",
                  },
                  {
                    type: "Insurance Claim",
                    description: "Submitted claim #789",
                    iconColor: "text-green-500",
                  },
                  {
                    type: "Prescription",
                    description: "Received prescription NFT",
                    iconColor: "text-purple-500",
                  },
                ],
          staking: [
            { pool: "DOT Staking", amount: "25.6 DOT", reward: "$42.15" },
            { pool: "AZERO Farm", amount: "100 AZERO", reward: "$80.00" },
          ],
          dao: [
            { name: "HealthDAO", role: "Voter", proposalsVoted: 4 },
            { name: "MedicChain DAO", role: "Contributor", proposalsVoted: 2 },
          ],
        };
        setWalletData(mockData);
      } catch (error) {
        toast({
          title: "Error loading profile",
          description: "Failed to load wallet data. Please reconnect your wallet.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    loadWalletData();
  }, [navigate]);

  const handleDisconnect = () => {
    localStorage.removeItem("walletAccount");
    toast({
      title: "Wallet disconnected",
      description: "You have been logged out of your account.",
    });
    navigate("/login");
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-screen animate-pulse">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4">Loading profile data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10 animate-fade-in">
      {/* Dashboard Cards Here */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">Portfolio Value</p>
            <p className="text-xl font-bold text-green-600">{walletData.portfolioValue}</p>
          </CardContent>
        </Card>
        <Card className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">Recent Transactions</p>
            <p className="text-xl font-bold">{walletData.recentTransactions}</p>
          </CardContent>
        </Card>
        <Card className="hover:scale-[1.02] transition-transform duration-300">
          <CardContent className="p-4 space-y-1">
            <p className="text-sm text-muted-foreground">Gas Fee (24h)</p>
            <p className="text-xl font-bold text-red-500">{walletData.gasFee}</p>
          </CardContent>
        </Card>
      </div>

      {/* User Identity & Account */}
      <Card className="shadow-lg border hover:border-blue-400 transition duration-300">
        <CardContent className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="https://api.dicebear.com/7.x/bottts/svg?seed=user" alt="avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">{formatAddress(walletData.address)}</p>
              <p className="text-sm text-muted-foreground">Connected via {walletData.walletProvider || "Unknown"}</p>
              <p className="text-xs text-blue-600">Role: {walletData.type === "doctor" ? "Healthcare Provider" : "Patient"}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary">Edit Profile</Button>
            <Button variant="destructive" onClick={handleDisconnect}>Disconnect</Button>
          </div>
        </CardContent>
      </Card>

      {/* Tokens Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">💸 Tokens</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {walletData.tokens.map((token, index) => (
            <Card key={index} className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 space-y-1">
                <p className="font-medium">{token.name}</p>
                <p className="text-sm text-muted-foreground">Balance: {token.balance}</p>
                <p className="text-sm font-semibold text-green-600">{token.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* NFTs Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">🎨 NFTs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {walletData.nfts.map((nft, index) => (
            <Card key={index} className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 space-y-1">
                <p className="font-medium">ID: {nft.id}</p>
                <p className="text-sm text-muted-foreground">Collection: {nft.collection}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Activity Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">📋 Recent Activity</h2>
        <div className="space-y-3">
          {walletData.activity.map((item, index) => (
            <Card key={index} className="border-l-4 p-4" style={{ borderLeftColor: item.iconColor.replace("text-", "") }}>
              <div className="space-y-1">
                <p className="text-sm font-semibold">{item.type}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
   

      {/* ...Existing Sections */}

      {/* Staking Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">📈 Staking / Yield Farming</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {walletData.staking.map((stake, idx) => (
            <Card key={idx} className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 space-y-1">
                <p className="font-medium">{stake.pool}</p>
                <p className="text-sm text-muted-foreground">Staked: {stake.amount}</p>
                <p className="text-sm text-green-600">Reward: {stake.reward}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* DAO Participation Section */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">🏛️ DAO Participation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {walletData.dao.map((entry, idx) => (
            <Card key={idx} className="hover:scale-105 transition-transform duration-300">
              <CardContent className="p-4 space-y-1">
                <p className="font-medium">{entry.name}</p>
                <p className="text-sm text-muted-foreground">Role: {entry.role}</p>
                <p className="text-sm text-blue-600">Proposals Voted: {entry.proposalsVoted}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

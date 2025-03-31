
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { 
  Wallet, 
  UserCircle2, 
  Stethoscope
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface WalletAccount {
  address: string;
  type: "patient" | "doctor";
}

// Mock wallet connection function - would be replaced with real wallet integration
const connectWallet = async (): Promise<string> => {
  // Simulate wallet connection delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return mock wallet address
  return "azero1qrx7kdlgner84kx9rz5vrzhnrzknp2t7rh8d9her7a85re77vhesfjkznm";
};

export function WalletConnector() {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTab, setActiveTab] = useState<"patient" | "doctor">("patient");

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      const address = await connectWallet();
      
      // Store wallet info in localStorage (in a real app, use a secure state management)
      const account: WalletAccount = {
        address,
        type: activeTab
      };
      
      localStorage.setItem("walletAccount", JSON.stringify(account));
      
      // Show success toast
      toast({
        title: "Wallet connected successfully",
        description: `Connected as ${activeTab} with address: ${address.substring(0, 6)}...${address.substring(address.length - 4)}`,
      });
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
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

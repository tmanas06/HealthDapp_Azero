
import { WalletConnector } from "@/components/WalletConnector";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  
  // Check if user is already logged in
  useEffect(() => {
    const account = localStorage.getItem("walletAccount");
    
    if (account) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex flex-col items-center">
        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-healthblue-400 to-healthgreen-500 flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-healthblue-500 to-healthgreen-500 bg-clip-text text-transparent">
          HealthChain Sentinel
        </h1>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          Secured decentralized healthcare records with AI-powered analytics
        </p>
      </div>
      
      <WalletConnector />
      
      <div className="mt-8 text-xs text-center text-muted-foreground max-w-md">
        <p>
          By connecting your wallet, you agree to our Terms of Service and Privacy Policy.
          Your health data remains encrypted and under your control.
        </p>
      </div>
    </div>
  );
};

export default Login;

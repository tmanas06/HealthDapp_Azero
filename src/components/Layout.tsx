
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

interface WalletAccount {
  address: string;
  evmAddress: string;
  type: "patient" | "doctor";
  walletProvider: string;
}

const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated
    const storedAccount = localStorage.getItem("walletAccount");
    
    if (!storedAccount && location.pathname !== "/login") {
      navigate("/login");
    } else if (storedAccount) {
      setAccount(JSON.parse(storedAccount));
    }
    
    setIsLoading(false);
  }, [navigate, location.pathname]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-healthblue-500 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="h-full flex flex-col md:flex-row">
        <div className="w-64 hidden md:block overflow-hidden">
          <Sidebar userType={account?.type} />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header walletAddress={account?.address} userType={account?.type} />
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

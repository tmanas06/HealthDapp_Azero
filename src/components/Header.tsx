
import { LogOut, Wallet, User, Shield } from "lucide-react";
import { Notification } from "@/components/ui/notification";


import { Settings, LogOut, Wallet } from "lucide-react";
import NotificationCard from "./NotificationCard";

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  walletAddress?: string;
  evmAddress?: string;
  userType?: "patient" | "doctor";
}

const Header = ({ walletAddress, evmAddress, userType }: HeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("walletAccount");
    toast({
      title: "Logged out successfully",
      description: "Your wallet has been disconnected",
    });
    navigate("/login");
  };

  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const getAvatarDetails = () => {
    if (userType === "doctor") {
      return {
        initials: "DR",
        bg: "bg-healthgreen-100 text-healthgreen-700",
        name: "Doctor",
        role: "Healthcare Provider",
      };
    }
    return {
      initials: "PT",
      bg: "bg-healthblue-100 text-healthblue-700",
      name: "Patient",
      role: "Healthcare User",
    };
  };

  const avatar = getAvatarDetails();

  return (
    <header className="w-full px-6 py-3 flex justify-between items-center border-b">
      <div className="flex items-center gap-2">
        <span className="text-xl font-semibold bg-gradient-to-r from-healthblue-500 to-healthgreen-500 bg-clip-text text-transparent">
          HealthChain Sentinel
        </span>
      </div>

      <div className="flex items-center gap-4">
        {walletAddress && (
          <div className="hidden md:flex gap-2">
            <Button variant="outline" size="sm" title="Native Address">
              <Wallet className="mr-2 h-4 w-4" />
              {formatAddress(walletAddress)}
            </Button>
            <Button variant="outline" size="sm" title="EVM Address">
              <Wallet className="mr-2 h-4 w-4" />
              {formatAddress(evmAddress)}
            </Button>
          </div>
        )}


        <Notification />


        
        <NotificationCard />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={avatar.bg}>{avatar.initials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">{avatar.name}</span>
                <span className="text-xs text-muted-foreground">{avatar.role}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Wallet className="mr-2 h-4 w-4" />
              Native: {formatAddress(walletAddress)}
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigate("/Profile")}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/security")}>
              <Shield className="mr-2 h-4 w-4" />
              Security
            </DropdownMenuItem>

            {/* <DropdownMenuItem>
              <Wallet className="mr-2 h-4 w-4" />
              EVM: {formatAddress(evmAddress)}
            </DropdownMenuItem> */}

            {userType === "doctor" ? (
              <DropdownMenuItem onClick={() => navigate("/patients")}>
                My Patients
              </DropdownMenuItem>
            ) : (

              <DropdownMenuItem onClick={() => navigate("/medical-records")}>
                My Medical Records
              </DropdownMenuItem>
            )}

              <DropdownMenuItem onClick={() => navigate('/patient-records')}>My Medical Records</DropdownMenuItem>
            )}
            {/* <DropdownMenuItem>Settings</DropdownMenuItem> */}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

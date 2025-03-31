
import { Bell, Settings, LogOut, Wallet } from "lucide-react";
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
  userType?: "patient" | "doctor";
}

const Header = ({ walletAddress, userType }: HeaderProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem("walletAccount");
    toast({
      title: "Logged out successfully",
      description: "Your wallet has been disconnected",
    });
    navigate("/login");
  };
  
  // Format wallet address for display
  const formatAddress = (address?: string) => {
    if (!address) return "";
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };
  
  // Generate initials and avatar color based on user type
  const getAvatarDetails = () => {
    if (userType === "doctor") {
      return { 
        initials: "DR", 
        bg: "bg-healthgreen-100 text-healthgreen-700",
        name: "Doctor",
        role: "Healthcare Provider"
      };
    }
    return { 
      initials: "PT", 
      bg: "bg-healthblue-100 text-healthblue-700",
      name: "Patient",
      role: "Healthcare User"
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
          <Button variant="outline" size="sm" className="hidden md:flex">
            <Wallet className="mr-2 h-4 w-4" />
            {formatAddress(walletAddress)}
          </Button>
        )}
        
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 bg-healthorange-500 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
            3
          </span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>System Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Security</DropdownMenuItem>
            <DropdownMenuItem>Notifications</DropdownMenuItem>
            <DropdownMenuItem>Integrations</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2" size="sm">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={avatar.bg}>
                  {avatar.initials}
                </AvatarFallback>
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
              {formatAddress(walletAddress)}
            </DropdownMenuItem>
            {userType === "doctor" ? (
              <DropdownMenuItem>My Patients</DropdownMenuItem>
            ) : (
              <DropdownMenuItem>My Medical Records</DropdownMenuItem>
            )}
            <DropdownMenuItem>Settings</DropdownMenuItem>
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


import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Activity, 
  Shield, 
  Lock, 
  UserCheck, 
  Database, 
  Key, 
  BarChart, 
  FileText, 
  Settings, 
  Home 
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  variant: "default" | "ghost";
  active?: boolean;
}

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  
  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      variant: activeItem === "Dashboard" ? "default" : "ghost",
      active: activeItem === "Dashboard",
    },
    {
      title: "Patient Records",
      icon: <FileText className="h-5 w-5" />,
      variant: activeItem === "Patient Records" ? "default" : "ghost",
      active: activeItem === "Patient Records",
    },
    {
      title: "AI Predictor",
      icon: <Activity className="h-5 w-5" />,
      variant: activeItem === "AI Predictor" ? "default" : "ghost",
      active: activeItem === "AI Predictor",
    },
    {
      title: "Access Control",
      icon: <Lock className="h-5 w-5" />,
      variant: activeItem === "Access Control" ? "default" : "ghost",
      active: activeItem === "Access Control",
    },
    {
      title: "Zero Knowledge",
      icon: <Shield className="h-5 w-5" />,
      variant: activeItem === "Zero Knowledge" ? "default" : "ghost",
      active: activeItem === "Zero Knowledge",
    },
  ];
  
  const secondaryNavItems: NavItem[] = [
    {
      title: "Identity Verification",
      icon: <UserCheck className="h-5 w-5" />,
      variant: activeItem === "Identity Verification" ? "default" : "ghost",
      active: activeItem === "Identity Verification",
    },
    {
      title: "Blockchain Records",
      icon: <Database className="h-5 w-5" />,
      variant: activeItem === "Blockchain Records" ? "default" : "ghost",
      active: activeItem === "Blockchain Records",
    },
    {
      title: "Key Management",
      icon: <Key className="h-5 w-5" />,
      variant: activeItem === "Key Management" ? "default" : "ghost",
      active: activeItem === "Key Management",
    },
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      variant: activeItem === "Analytics" ? "default" : "ghost",
      active: activeItem === "Analytics",
    },
    {
      title: "System Settings",
      icon: <Settings className="h-5 w-5" />,
      variant: activeItem === "System Settings" ? "default" : "ghost",
      active: activeItem === "System Settings",
    },
  ];

  return (
    <div className="group h-full flex flex-col bg-sidebar border-r">
      <div className="p-4 flex flex-col">
        <div className="h-12 mb-4 flex items-center justify-center">
          <div className="flex items-center">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-healthblue-400 to-healthgreen-500 flex items-center justify-center">
              <Shield className="h-4 w-4 text-white" />
            </div>
            <span className="ml-2 font-semibold text-sidebar-foreground">HealthChain</span>
          </div>
        </div>
        
        <ScrollArea className="flex-1 pb-4">
          <div className="px-2 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.title}
                variant={item.variant}
                size="sm"
                onClick={() => setActiveItem(item.title)}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Button>
            ))}
          </div>
          
          <div className="mt-6 px-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
              System & Security
            </h3>
            <div className="space-y-2">
              {secondaryNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => setActiveItem(item.title)}
                  className={cn(
                    "w-full justify-start h-10 px-3",
                    item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>
      
      <div className="mt-auto border-t border-sidebar-border p-4">
        <div className="bg-sidebar-accent/50 rounded-lg p-3 text-xs">
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 rounded-full bg-healthgreen-500 animate-pulse"></div>
            <span className="text-sidebar-foreground/80">Aleph Zero Network</span>
          </div>
          <div className="mt-2 text-sidebar-foreground/60">
            <div className="flex items-center justify-between text-xs">
              <span>Blockchain Status</span>
              <span className="font-medium text-healthgreen-400">Active</span>
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Last Synced</span>
              <span>2 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

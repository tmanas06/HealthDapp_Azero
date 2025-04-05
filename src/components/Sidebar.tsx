
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate, useLocation } from "react-router-dom";
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
  Home,
  Stethoscope,
  UserCircle2,
  Calendar
} from "lucide-react";

interface NavItem {
  title: string;
  icon: React.ReactNode;
  variant: "default" | "ghost";
  active?: boolean;
  path: string;
}

interface SidebarProps {
  userType?: "patient" | "doctor";
}

const Sidebar = ({ userType = "patient" }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.split('/')[1] || "dashboard";
  
  // Define base navigation items common to both user types
  const baseNavItems: NavItem[] = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      variant: currentPath === "dashboard" ? "default" : "ghost",
      active: currentPath === "dashboard",
      path: "/dashboard"
    }
  ];
  
  // Doctor-specific navigation items
  const doctorNavItems: NavItem[] = [
    {
      title: "Patient Records",
      icon: <FileText className="h-5 w-5" />,
      variant: currentPath === "patient-records" ? "default" : "ghost",
      active: currentPath === "patient-records",
      path: "/patient-records"
    },
    {
      title: "AI Predictor",
      icon: <Activity className="h-5 w-5" />,
      variant: currentPath === "ai-predictor" ? "default" : "ghost",
      active: currentPath === "ai-predictor",
      path: "/ai-predictor"
    },
    {
      title: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      variant: currentPath === "appointments" ? "default" : "ghost",
      active: currentPath === "appointments",
      path: "/appointments"
    }
  ];
  
  // Patient-specific navigation items
  const patientNavItems: NavItem[] = [
    {
      title: "My Health Records",
      icon: <FileText className="h-5 w-5" />,
      variant: currentPath === "patient-records" ? "default" : "ghost",
      active: currentPath === "patient-records",
      path: "/patient-records"
    },
    {
      title: "Health Insights",
      icon: <Activity className="h-5 w-5" />,
      variant: currentPath === "ai-predictor" ? "default" : "ghost",
      active: currentPath === "ai-predictor",
      path: "/ai-predictor"
    },
    {
      title: "My Doctors",
      icon: <Stethoscope className="h-5 w-5" />,
      variant: currentPath === "my-doctors" ? "default" : "ghost",
      active: currentPath === "my-doctors",
      path: "/my-doctors"
    },
    {
      title: "Appointments",
      icon: <Calendar className="h-5 w-5" />,
      variant: currentPath === "appointments" ? "default" : "ghost",
      active: currentPath === "appointments",
      path: "/appointments"
    }
  ];
  
  // Security-related navigation items (common to both)
  const securityNavItems: NavItem[] = [
    {
      title: "Access Control",
      icon: <Lock className="h-5 w-5" />,
      variant: currentPath === "access-control" ? "default" : "ghost",
      active: currentPath === "access-control",
      path: "/access-control"
    },
    {
      title: "Zero Knowledge",
      icon: <Shield className="h-5 w-5" />,
      variant: currentPath === "zero-knowledge" ? "default" : "ghost",
      active: currentPath === "zero-knowledge",
      path: "/zero-knowledge"
    },
    {
      title: "Identity Verification",
      icon: <UserCheck className="h-5 w-5" />,
      variant: currentPath === "identity-verification" ? "default" : "ghost",
      active: currentPath === "identity-verification",
      path: "/identity-verification"
    },
    {
      title: "Blockchain Records",
      icon: <Database className="h-5 w-5" />,
      variant: currentPath === "blockchain-records" ? "default" : "ghost",
      active: currentPath === "blockchain-records",
      path: "/blockchain-records"
    },
    {
      title: "Key Management",
      icon: <Key className="h-5 w-5" />,
      variant: currentPath === "key-management" ? "default" : "ghost",
      active: currentPath === "key-management",
      path: "/key-management"
    },
  ];
  
  // Admin-related navigation items (common to both)
  const adminNavItems: NavItem[] = [
    {
      title: "Analytics",
      icon: <BarChart className="h-5 w-5" />,
      variant: currentPath === "analytics" ? "default" : "ghost",
      active: currentPath === "analytics",
      path: "/analytics"
    },
    {
      title: "System Settings",
      icon: <Settings className="h-5 w-5" />,
      variant: currentPath === "system-settings" ? "default" : "ghost",
      active: currentPath === "system-settings",
      path: "/system-settings"
    },
  ];

  // Combine navigation items based on user type
  const navItems = [...baseNavItems, ...(userType === "doctor" ? doctorNavItems : patientNavItems)];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

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
          <div className="px-2 space-y-1 mb-6">
            {/* User Type Indicator */}
            <div className="mb-2 px-3 py-2 rounded-md bg-sidebar-accent/30">
              <div className="flex items-center">
                {userType === "doctor" ? (
                  <Stethoscope className="h-4 w-4 text-healthgreen-500 mr-2" />
                ) : (
                  <UserCircle2 className="h-4 w-4 text-healthblue-500 mr-2" />
                )}
                <span className="text-xs font-medium text-sidebar-foreground/80">
                  {userType === "doctor" ? "Doctor Portal" : "Patient Portal"}
                </span>
              </div>
            </div>
            
            {/* Main navigation */}
            {navItems.map((item) => (
              <Button
                key={item.title}
                variant={item.variant}
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={cn(
                  "w-full justify-start h-10 px-3 text-white",
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
              Security & Privacy
            </h3>
            <div className="space-y-1">
              {securityNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-white",
                    item.active ? "bg-sidebar-primary text-primary-foreground" : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mt-6 px-2">
            <h3 className="text-xs uppercase tracking-wider text-sidebar-foreground/50 px-3 mb-2">
              System
            </h3>
            <div className="space-y-1">
              {adminNavItems.map((item) => (
                <Button
                  key={item.title}
                  variant={item.variant}
                  size="sm"
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full justify-start h-10 px-3 text-white",
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

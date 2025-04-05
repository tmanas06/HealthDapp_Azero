import { useEffect, useState, useCallback, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import PatientRecords from "@/components/PatientRecords";
import AIPredictor from "@/components/AIPredictor";
import AccessControl from "@/components/AccessControl";
import ZeroKnowledge from "@/components/ZeroKnowledge";
import Appointments from "@/components/Appointments";

// Import the pages for extra navigation (memoized)
const IdentityVerification = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Identity Verification</h1><p className="text-muted-foreground">Secure identity management for healthcare providers and patients</p></div>);
const BlockchainRecords = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Blockchain Records</h1><p className="text-muted-foreground">View and manage blockchain transaction history</p></div>);
const KeyManagement = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Key Management</h1><p className="text-muted-foreground">Manage encryption keys and access control</p></div>);
const Analytics = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Analytics</h1><p className="text-muted-foreground">Healthcare data insights and trends</p></div>);
const SystemSettings = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">System Settings</h1><p className="text-muted-foreground">Configure system parameters and preferences</p></div>);
// const MyDoctors = memo(() => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">My Doctors</h1><p className="text-muted-foreground">View and manage your connected healthcare providers</p></div>);
import MyDoctors from "@/components/MyDoctors";
interface IndexProps {
  initialTab?: string;
}

// Map tab names to routes for easier management
const tabToRoute: Record<string, string> = {
  "Dashboard": "/dashboard",
  "Patient Records": "/patient-records",
  "AI Predictor": "/ai-predictor",
  "Access Control": "/access-control",
  "Zero Knowledge": "/zero-knowledge",
  "Identity Verification": "/identity-verification",
  "Blockchain Records": "/blockchain-records",
  "Key Management": "/key-management",
  "Analytics": "/analytics",
  // "System Settings": "/system-settings",
  "My Doctors": "/my-doctors",
  "Appointments": "/appointments"
};

// Convert route to tab name
const routeToTab = Object.entries(tabToRoute).reduce((acc, [tab, route]) => {
  acc[route] = tab;
  return acc;
}, {} as Record<string, string>);

const Index = ({ initialTab = "Dashboard" }: IndexProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);

  // Determine the active tab from the current route
  useEffect(() => {
    const currentTab = routeToTab[location.pathname] || initialTab;
    setActiveTab(currentTab);
  }, [location.pathname, initialTab]);

  // Memoize the renderContent function to prevent unnecessary re-renders
  const renderContent = useCallback(() => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard key="dashboard" />;
      case "Patient Records":
        return <PatientRecords key="patient-records" />;
      case "AI Predictor":
        return <AIPredictor key="ai-predictor" />;
      case "Access Control":
        return <AccessControl key="access-control" />;
      case "Zero Knowledge":
        return <ZeroKnowledge key="zero-knowledge" />;
      case "Identity Verification":
        return <IdentityVerification key="identity-verification" />;
      case "Blockchain Records":
        return <BlockchainRecords key="blockchain-records" />;
      case "Key Management":
        return <KeyManagement key="key-management" />;
      case "Analytics":
        return <Analytics key="analytics" />;
      case "System Settings":
        return <SystemSettings key="system-settings" />;
      case "My Doctors":
        return <MyDoctors key="my-doctors" />;
      case "Appointments":
        return <Appointments key="appointments" />;
      default:
        return <Dashboard key="dashboard-default" />;
    }
  }, [activeTab]);

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default memo(Index);

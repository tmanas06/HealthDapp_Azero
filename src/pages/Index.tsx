
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import PatientRecords from "@/components/PatientRecords";
import AIPredictor from "@/components/AIPredictor";
import AccessControl from "@/components/AccessControl";
import ZeroKnowledge from "@/components/ZeroKnowledge";

// Import the pages for extra navigation
const IdentityVerification = () => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Identity Verification</h1><p className="text-muted-foreground">Secure identity management for healthcare providers and patients</p></div>;
const BlockchainRecords = () => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Blockchain Records</h1><p className="text-muted-foreground">View and manage blockchain transaction history</p></div>;
const KeyManagement = () => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Key Management</h1><p className="text-muted-foreground">Manage encryption keys and access control</p></div>;
const Analytics = () => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">Analytics</h1><p className="text-muted-foreground">Healthcare data insights and trends</p></div>;
const SystemSettings = () => <div className="space-y-6"><h1 className="text-3xl font-bold tracking-tight">System Settings</h1><p className="text-muted-foreground">Configure system parameters and preferences</p></div>;

interface IndexProps {
  initialTab?: string;
}

const Index = ({ initialTab = "Dashboard" }: IndexProps) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    // Map tab names to routes
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
      "System Settings": "/system-settings"
    };

    // Navigate to the corresponding route when activeTab changes
    const route = tabToRoute[activeTab];
    if (route) {
      navigate(route, { replace: true });
    }
  }, [activeTab, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case "Dashboard":
        return <Dashboard />;
      case "Patient Records":
        return <PatientRecords />;
      case "AI Predictor":
        return <AIPredictor />;
      case "Access Control":
        return <AccessControl />;
      case "Zero Knowledge":
        return <ZeroKnowledge />;
      case "Identity Verification":
        return <IdentityVerification />;
      case "Blockchain Records":
        return <BlockchainRecords />;
      case "Key Management":
        return <KeyManagement />;
      case "Analytics":
        return <Analytics />;
      case "System Settings":
        return <SystemSettings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderContent()}
    </Layout>
  );
};

export default Index;

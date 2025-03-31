
import { useState } from "react";
import Layout from "@/components/Layout";
import Dashboard from "@/components/Dashboard";
import PatientRecords from "@/components/PatientRecords";
import AIPredictor from "@/components/AIPredictor";
import AccessControl from "@/components/AccessControl";
import ZeroKnowledge from "@/components/ZeroKnowledge";

const Index = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

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

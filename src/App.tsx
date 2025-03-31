
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Index initialTab="Dashboard" />} />
          <Route path="/patient-records" element={<Index initialTab="Patient Records" />} />
          <Route path="/ai-predictor" element={<Index initialTab="AI Predictor" />} />
          <Route path="/access-control" element={<Index initialTab="Access Control" />} />
          <Route path="/zero-knowledge" element={<Index initialTab="Zero Knowledge" />} />
          <Route path="/identity-verification" element={<Index initialTab="Identity Verification" />} />
          <Route path="/blockchain-records" element={<Index initialTab="Blockchain Records" />} />
          <Route path="/key-management" element={<Index initialTab="Key Management" />} />
          <Route path="/analytics" element={<Index initialTab="Analytics" />} />
          <Route path="/system-settings" element={<Index initialTab="System Settings" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

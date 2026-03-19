import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CameraProvider } from "@/contexts/CameraContext";

import Splash from "./pages/Splash";
import Connect from "./pages/Connect";
import Dashboard from "./pages/Dashboard";
import Cameras from "./pages/Cameras";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CameraProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>

          {/* Splash */}
          <Route path="/" element={<Splash />} />

          {/* Connect */}
          <Route path="/connect" element={<Connect />} />

          {/* Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* NEW PAGES */}
          <Route path="/cameras" element={<Cameras />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
      </TooltipProvider>
    </CameraProvider>
  </QueryClientProvider>
);

export default App;
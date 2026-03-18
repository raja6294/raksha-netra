import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Splash from "./pages/Splash";
import Connect from "./pages/Connect";
import Index from "./pages/Index"; // dashboard
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>

          {/* 1️⃣ Splash / Logo Page */}
          <Route path="/" element={<Splash />} />

          {/* 2️⃣ Connect Page */}
          <Route path="/connect" element={<Connect />} />

          {/* 3️⃣ Dashboard */}
          <Route path="/dashboard" element={<Index />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
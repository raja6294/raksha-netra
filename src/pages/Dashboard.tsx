import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/Navbar";
import CameraFeed from "@/components/CameraFeed";
import Alerts from "@/components/Alerts";
import Analytics from "@/components/Analytics";
import { generateMockAlert, resetAlerts } from "@/api/api";
import { useCamera } from "@/contexts/CameraContext";
import type { AlertData, CameraFeedData, AnalyticsData } from "@/api/api";
import { ShieldAlert } from "lucide-react";

const initialCameras: CameraFeedData[] = [
  { id: "CAM-001", name: "Main Entrance", location: "Ground Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-002", name: "Parking Lot B", location: "Basement", status: "active", suspiciousActivity: false },
  { id: "CAM-003", name: "Electronics Store", location: "2nd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-004", name: "Food Court", location: "3rd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-005", name: "Jewelry Section", location: "1st Floor", status: "offline", suspiciousActivity: false },
  { id: "CAM-006", name: "Emergency Exit", location: "Ground Floor", status: "active", suspiciousActivity: false },
];

const Dashboard = () => {
  const location = useLocation();
  const { cameraStream, startCamera } = useCamera();

  const [cameras, setCameras] = useState<CameraFeedData[]>(initialCameras);
  const [alerts, setAlerts] = useState<AlertData[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalAlertsToday: 0,
    suspiciousActivities: 0,
    camerasActive: 5,
    resolvedIncidents: 0,
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isAlert = alerts.length >= 2;

  // ✅ START CAMERA WHEN USER COMES FROM CONNECT PAGE OR RETURNS TO DASHBOARD
  useEffect(() => {
    if (location.state?.cameraOn) {
      startCamera();
    }
  }, [location.state?.cameraOn, startCamera]);

  const triggerAlert = useCallback(() => {
    const newAlert = generateMockAlert();
    setAlerts((prev) => [...prev, newAlert]);

    setAnalytics((prev) => ({
      ...prev,
      totalAlertsToday: prev.totalAlertsToday + 1,
      suspiciousActivities: prev.suspiciousActivities + 1,
    }));

    // Mark random camera suspicious
    setCameras((prev) => {
      const activeCams = prev.filter((c) => c.status === "active" && !c.suspiciousActivity);
      if (activeCams.length === 0) return prev;

      const target = activeCams[Math.floor(Math.random() * activeCams.length)];

      return prev.map((c) =>
        c.id === target.id ? { ...c, suspiciousActivity: true } : c
      );
    });
  }, []);

  const resetSystem = useCallback(() => {
    resetAlerts();
    setAlerts([]);
    setCameras(initialCameras);

    setAnalytics((prev) => ({
      ...prev,
      suspiciousActivities: 0,
    }));

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  // 🔊 Alarm logic
  useEffect(() => {
    if (alerts.length >= 2 && audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, [alerts.length]);

  // ⏱ Auto alerts demo
  useEffect(() => {
    if (alerts.length >= 4) return;

    const timer = setTimeout(() => {
      triggerAlert();
    }, 8000);

    return () => clearTimeout(timer);
  }, [alerts.length, triggerAlert]);

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-500 ${isAlert ? "ring-2 ring-danger/30 ring-inset" : ""}`}>
      
      {/* 🔊 Alarm audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src="data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==" type="audio/wav" />
      </audio>

      <Navbar isAlert={isAlert} alertCount={alerts.length} />

      <main className="flex-1 p-4 space-y-4">

        {/* 🚨 Alert banner */}
        {isAlert && (
          <div className="alert-pulse rounded border border-danger bg-danger/10 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-5 w-5 text-danger" />
              <span className="blink text-sm font-mono font-bold text-danger tracking-wider">
                ⚠ SECURITY ALERT DETECTED — IMMEDIATE ACTION REQUIRED
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* 🎥 Camera Feed */}
          <div className="lg:col-span-8">
            <CameraFeed 
              cameras={cameras} 
              isAlert={isAlert} 
              cameraStream={cameraStream}   // 🔥 PASS STREAM HERE
            />
          </div>

          {/* 📊 Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <Analytics data={analytics} />
            <Alerts alerts={alerts} isAlert={isAlert} />
          </div>
        </div>

        {/* 🎮 Controls */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={triggerAlert}
            className="text-xs font-mono px-4 py-2 rounded border border-warning/30 bg-warning/10 text-warning hover:bg-warning/20 transition-colors"
          >
            SIMULATE ALERT
          </button>

          <button
            onClick={resetSystem}
            className="text-xs font-mono px-4 py-2 rounded border border-border bg-secondary text-muted-foreground hover:text-foreground transition-colors"
          >
            RESET SYSTEM
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-2 text-center">
        <p className="text-[10px] font-mono text-muted-foreground tracking-wider">
          RAKSANETRA v1.0 • SMART THEFT DETECTION SYSTEM • ALL SYSTEMS MONITORED
        </p>
      </footer>
    </div>
  );
};

export default Dashboard;
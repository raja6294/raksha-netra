import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Wifi, WifiOff, Camera, Plug } from "lucide-react";
import type { CameraFeedData } from "@/api/api";
import { useCamera } from "@/contexts/CameraContext";

const initialCameras: CameraFeedData[] = [
  { id: "CAM-001", name: "Main Entrance", location: "Ground Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-002", name: "Parking Lot B", location: "Basement", status: "active", suspiciousActivity: false },
  { id: "CAM-003", name: "Electronics Store", location: "2nd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-004", name: "Food Court", location: "3rd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-005", name: "Jewelry Section", location: "1st Floor", status: "offline", suspiciousActivity: false },
  { id: "CAM-006", name: "Emergency Exit", location: "Ground Floor", status: "active", suspiciousActivity: false },
];

const Cameras = () => {
  const navigate = useNavigate();
  const { startCamera } = useCamera();
  const [cameras] = useState<CameraFeedData[]>(initialCameras);

  const handleConnectCamera = async (camera: CameraFeedData) => {
    if (camera.status === "offline") {
      alert("This camera is offline and cannot be connected.");
      return;
    }
    
    // Start the camera stream
    await startCamera();
    
    // Navigate to dashboard with camera on flag
    navigate("/dashboard", { state: { cameraOn: true } });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isAlert={false} alertCount={0} />

      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">All Cameras</h1>
        <p className="text-muted-foreground text-sm mb-6">Manage and connect to your security cameras</p>

        {/* Cameras Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              className={`rounded-lg border transition-all duration-300 overflow-hidden ${
                camera.status === "active"
                  ? "border-success/40 bg-card hover:border-success/60 hover:shadow-lg hover:shadow-success/20"
                  : "border-muted-foreground/20 bg-card/50 opacity-60"
              }`}
            >
              {/* Camera Preview Background */}
              <div className="relative h-32 bg-gradient-to-br from-card via-secondary/50 to-card overflow-hidden">
                <div className="absolute inset-0 scanline-overlay opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-12 w-12 text-muted-foreground/40" />
                </div>

                {/* Status Badge */}
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 px-2 py-1 rounded">
                  {camera.status === "active" ? (
                    <>
                      <Wifi className="h-3 w-3 text-success" />
                      <span className="text-xs font-mono text-success">ONLINE</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs font-mono text-muted-foreground">OFFLINE</span>
                    </>
                  )}
                </div>
              </div>

              {/* Camera Info */}
              <div className="p-4 space-y-3">
                {/* Camera ID and Name */}
                <div>
                  <p className="text-xs font-mono text-muted-foreground mb-1">{camera.id}</p>
                  <p className="text-lg font-semibold">{camera.name}</p>
                </div>

                {/* Location */}
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-1">LOCATION</p>
                  <p className="text-sm">{camera.location}</p>
                </div>

                {/* Status Info */}
                <div className="border-t border-border pt-3">
                  <p className="text-xs text-muted-foreground mb-1">STATUS</p>
                  <p className={`text-sm font-mono ${camera.status === "active" ? "text-success" : "text-danger"}`}>
                    {camera.status === "active" ? "✓ ACTIVE" : "✗ OFFLINE"}
                  </p>
                </div>

                {/* Connect Button */}
                <button
                  onClick={() => handleConnectCamera(camera)}
                  disabled={camera.status === "offline"}
                  className={`w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded font-mono text-xs font-bold transition-all duration-300 ${
                    camera.status === "active"
                      ? "bg-primary/20 text-primary border border-primary/40 hover:bg-primary/30 hover:border-primary/60"
                      : "bg-muted/10 text-muted-foreground/50 border border-muted-foreground/20 cursor-not-allowed"
                  }`}
                >
                  <Plug className="h-4 w-4" />
                  CONNECT CAMERA
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {cameras.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Camera className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground">No cameras available</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cameras;
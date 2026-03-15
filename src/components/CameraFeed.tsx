import { Camera, Wifi, WifiOff } from "lucide-react";
import type { CameraFeedData } from "@/api/api";

interface CameraFeedProps {
  cameras: CameraFeedData[];
  isAlert: boolean;
}

const CameraFeed = ({ cameras, isAlert }: CameraFeedProps) => {
  const mainCamera = cameras[0];
  const otherCameras = cameras.slice(1);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Camera className="h-4 w-4" /> Live Camera Feed
        </h2>
        <span className="text-[10px] font-mono text-muted-foreground">
          {cameras.filter((c) => c.status === "active").length}/{cameras.length} ONLINE
        </span>
      </div>

      {/* Main feed */}
      {mainCamera && (
        <div
          className={`relative aspect-video rounded bg-card border overflow-hidden transition-shadow duration-300 ${
            isAlert ? "glow-danger border-danger/40" : mainCamera.suspiciousActivity ? "glow-warning border-warning/40" : "border-border"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary to-card" />
          <div className="absolute inset-0 scanline-overlay" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Camera className="h-12 w-12 text-muted-foreground/30 mx-auto" />
              <p className="text-xs text-muted-foreground/50 font-mono">LIVE FEED</p>
            </div>
          </div>
          {/* Overlay info */}
          <div className="absolute top-3 left-3 flex items-center gap-2 bg-background/80 px-2 py-1 rounded text-[10px] font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
            <span className="text-foreground">REC</span>
            <span className="text-muted-foreground">{mainCamera.id}</span>
          </div>
          <div className="absolute bottom-3 left-3 bg-background/80 px-2 py-1 rounded">
            <p className="text-[10px] font-mono text-muted-foreground">
              {mainCamera.name} • {mainCamera.location}
            </p>
          </div>
          <div className="absolute top-3 right-3 bg-background/80 px-2 py-1 rounded">
            <p className="text-[10px] font-mono text-muted-foreground">
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          {mainCamera.suspiciousActivity && (
            <div className="absolute inset-0 flex items-center justify-center bg-warning/10">
              <span className="alert-pulse text-warning font-mono font-bold text-sm tracking-wider bg-background/80 px-4 py-2 rounded">
                ⚠ SUSPICIOUS ACTIVITY
              </span>
            </div>
          )}
        </div>
      )}

      {/* Camera grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {otherCameras.map((cam) => (
          <div
            key={cam.id}
            className={`relative aspect-video rounded bg-card border overflow-hidden ${
              cam.suspiciousActivity ? "glow-warning border-warning/40" : cam.status === "offline" ? "border-border opacity-50" : "border-border"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-card via-secondary/50 to-card" />
            <div className="absolute inset-0 scanline-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Camera className="h-5 w-5 text-muted-foreground/20" />
            </div>
            <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between bg-background/80 px-1.5 py-0.5 rounded">
              <span className="text-[8px] font-mono text-muted-foreground truncate">{cam.id}</span>
              {cam.status === "active" ? (
                <Wifi className="h-2.5 w-2.5 text-success flex-shrink-0" />
              ) : (
                <WifiOff className="h-2.5 w-2.5 text-muted-foreground flex-shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraFeed;

import { AlertTriangle, Clock, Camera } from "lucide-react";
import type { AlertData } from "@/api/api";

interface AlertsProps {
  alerts: AlertData[];
  isAlert: boolean;
}

function getLevelStyle(level: number, isAlert: boolean) {
  if (isAlert && level >= 2) return "border-danger/50 bg-danger/10";
  switch (level) {
    case 1: return "border-warning/30 bg-warning/5";
    case 2: return "border-orange-500/30 bg-orange-500/5";
    case 3: return "border-danger/50 bg-danger/10";
    default: return "border-border";
  }
}

function getLevelBadge(level: number) {
  switch (level) {
    case 1: return <span className="text-[10px] font-mono font-bold text-warning bg-warning/10 px-1.5 py-0.5 rounded">LVL 1</span>;
    case 2: return <span className="text-[10px] font-mono font-bold text-orange-400 bg-orange-400/10 px-1.5 py-0.5 rounded">LVL 2</span>;
    case 3: return <span className="text-[10px] font-mono font-bold text-danger bg-danger/10 px-1.5 py-0.5 rounded">LVL 3</span>;
    default: return null;
  }
}

const Alerts = ({ alerts, isAlert }: AlertsProps) => {
  return (
    <div className={`h-full flex flex-col rounded border transition-colors duration-300 ${isAlert ? "border-danger/40 danger-bg" : "border-border bg-card"}`}>
      <div className="px-4 py-3 border-b border-border flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <AlertTriangle className={`h-4 w-4 ${isAlert ? "text-danger" : ""}`} />
          Alerts
        </h2>
        <span className={`text-xs font-mono font-bold ${isAlert ? "text-danger blink" : "text-muted-foreground"}`}>
          {alerts.length} {alerts.length === 1 ? "ALERT" : "ALERTS"}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[400px]">
        {alerts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-mono">NO ACTIVE ALERTS</p>
          </div>
        )}
        {[...alerts].reverse().map((alert) => (
          <div
            key={alert.id}
            className={`animate-slide-down border rounded p-3 space-y-2 ${getLevelStyle(alert.warningLevel, isAlert)}`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">{alert.id}</span>
              {getLevelBadge(alert.warningLevel)}
            </div>
            <p className="text-sm font-medium text-foreground">{alert.activityType}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
              <span className="flex items-center gap-1">
                <Camera className="h-3 w-3" /> {alert.cameraId}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> {new Date(alert.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;

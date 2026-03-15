import { Activity, ShieldAlert, Camera, CheckCircle } from "lucide-react";
import type { AnalyticsData } from "@/api/api";

interface AnalyticsProps {
  data: AnalyticsData;
}

const stats = [
  { key: "totalAlertsToday" as const, label: "Total Alerts", icon: Activity, color: "text-primary" },
  { key: "suspiciousActivities" as const, label: "Suspicious", icon: ShieldAlert, color: "text-warning" },
  { key: "camerasActive" as const, label: "Cameras Online", icon: Camera, color: "text-success" },
  { key: "resolvedIncidents" as const, label: "Resolved", icon: CheckCircle, color: "text-muted-foreground" },
];

const Analytics = ({ data }: AnalyticsProps) => {
  return (
    <div className="rounded border border-border bg-card">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Activity className="h-4 w-4" /> Analytics
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border">
        {stats.map(({ key, label, icon: Icon, color }) => (
          <div key={key} className="bg-card p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Icon className={`h-4 w-4 ${color}`} />
              <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">{label}</span>
            </div>
            <p className={`text-2xl font-mono font-bold animate-number-roll ${color}`}>
              {data[key]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;

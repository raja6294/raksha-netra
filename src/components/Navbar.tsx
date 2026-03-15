import { Shield, Activity, Radio } from "lucide-react";

interface NavbarProps {
  isAlert: boolean;
  alertCount: number;
}

const Navbar = ({ isAlert, alertCount }: NavbarProps) => {
  return (
    <nav className={`border-b border-border px-6 py-3 flex items-center justify-between transition-colors duration-300 ${isAlert ? "border-danger/50" : ""}`}>
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-primary">Raksha</span>
            <span className="text-foreground">Netra</span>
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground tracking-widest uppercase">
            AI Surveillance System
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5" /> Dashboard
          </a>
          <a href="#" className="hover:text-foreground transition-colors">Cameras</a>
          <a href="#" className="hover:text-foreground transition-colors">Reports</a>
          <a href="#" className="hover:text-foreground transition-colors">Settings</a>
        </div>

        {isAlert && alertCount >= 2 && (
          <span className="blink text-xs font-mono font-bold text-danger tracking-wider px-3 py-1 border border-danger rounded bg-danger/10">
            ⚠ SECURITY ALERT DETECTED
          </span>
        )}

        <div className="flex items-center gap-2">
          <Radio className={`h-3.5 w-3.5 ${isAlert ? "text-danger" : "text-success"}`} />
          <span className={`text-xs font-mono font-medium ${isAlert ? "text-danger" : "text-success"}`}>
            {isAlert ? "ALERT" : "SECURE"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { Shield, Activity, Radio } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  isAlert: boolean;
  alertCount: number;
}

const navItem =
  "relative px-3 py-1 transition-all duration-300 rounded-md";

const Navbar = ({ isAlert, alertCount }: NavbarProps) => {
  return (
    <nav className={`border-b px-6 py-3 flex items-center justify-between transition-all duration-300 ${isAlert ? "border-red-500/50" : "border-border"}`}>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <Shield className="h-6 w-6 text-primary" />
        <div>
          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-primary">Raksha</span>
            <span className="text-white">Netra</span>
          </h1>
          <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            AI Surveillance System
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-4 text-sm">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "text-white bg-primary/20"
                : "text-muted-foreground hover:text-white hover:bg-white/10"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/cameras"
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "text-white bg-primary/20"
                : "text-muted-foreground hover:text-white hover:bg-white/10"
            }`
          }
        >
          Cameras
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "text-white bg-primary/20"
                : "text-muted-foreground hover:text-white hover:bg-white/10"
            }`
          }
        >
          Reports
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `${navItem} ${
              isActive
                ? "text-white bg-primary/20"
                : "text-muted-foreground hover:text-white hover:bg-white/10"
            }`
          }
        >
          Settings
        </NavLink>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4">
        {isAlert && alertCount >= 2 && (
          <span className="text-xs font-mono text-red-500 border border-red-500 px-2 py-1 rounded animate-pulse">
            ⚠ ALERT
          </span>
        )}

        <div className="flex items-center gap-2">
          <Radio className={`h-3.5 w-3.5 ${isAlert ? "text-red-500" : "text-green-500"}`} />
          <span className={`text-xs font-mono ${isAlert ? "text-red-500" : "text-green-500"}`}>
            {isAlert ? "ALERT" : "SECURE"}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
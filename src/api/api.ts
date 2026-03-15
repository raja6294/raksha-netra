// API integration layer for RakshaNetra
// In demo mode, returns mock data. Replace BASE_URL with your backend.

const BASE_URL = "/api";

export interface CameraFeedData {
  id: string;
  name: string;
  location: string;
  status: "active" | "offline";
  suspiciousActivity: boolean;
}

export interface AlertData {
  id: string;
  timestamp: string;
  cameraId: string;
  activityType: string;
  warningLevel: 1 | 2 | 3;
  description: string;
}

export interface AnalyticsData {
  totalAlertsToday: number;
  suspiciousActivities: number;
  camerasActive: number;
  resolvedIncidents: number;
}

// Mock data generators
const mockCameras: CameraFeedData[] = [
  { id: "CAM-001", name: "Main Entrance", location: "Ground Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-002", name: "Parking Lot B", location: "Basement", status: "active", suspiciousActivity: false },
  { id: "CAM-003", name: "Electronics Store", location: "2nd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-004", name: "Food Court", location: "3rd Floor", status: "active", suspiciousActivity: false },
  { id: "CAM-005", name: "Jewelry Section", location: "1st Floor", status: "offline", suspiciousActivity: false },
  { id: "CAM-006", name: "Emergency Exit", location: "Ground Floor", status: "active", suspiciousActivity: false },
];

const activityTypes = [
  "Loitering detected",
  "Unusual movement pattern",
  "Unattended bag",
  "Restricted area breach",
  "Crowd anomaly",
  "Suspicious behavior near exit",
];

let alertCounter = 0;

export function generateMockAlert(): AlertData {
  alertCounter++;
  const level = alertCounter <= 1 ? 1 : alertCounter <= 2 ? 2 : 3;
  return {
    id: `ALT-${String(alertCounter).padStart(4, "0")}`,
    timestamp: new Date().toISOString(),
    cameraId: mockCameras[Math.floor(Math.random() * 4)].id,
    activityType: activityTypes[Math.floor(Math.random() * activityTypes.length)],
    warningLevel: level as 1 | 2 | 3,
    description: `Suspicious activity detected - Level ${level} warning`,
  };
}

export function resetAlerts() {
  alertCounter = 0;
}

export async function fetchCameraFeeds(): Promise<CameraFeedData[]> {
  try {
    const res = await fetch(`${BASE_URL}/camera_feed`);
    if (res.ok) return res.json();
  } catch {}
  return [...mockCameras];
}

export async function fetchAlerts(): Promise<AlertData[]> {
  try {
    const res = await fetch(`${BASE_URL}/alerts`);
    if (res.ok) return res.json();
  } catch {}
  return [];
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  try {
    const res = await fetch(`${BASE_URL}/analytics`);
    if (res.ok) return res.json();
  } catch {}
  return {
    totalAlertsToday: 0,
    suspiciousActivities: 0,
    camerasActive: mockCameras.filter((c) => c.status === "active").length,
    resolvedIncidents: 0,
  };
}

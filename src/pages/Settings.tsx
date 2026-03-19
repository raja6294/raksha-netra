import Navbar from "@/components/Navbar";

const Settings = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isAlert={false} alertCount={0} />

      <div className="p-4 space-y-4">
        <h1 className="text-xl">Settings</h1>

        <button className="px-4 py-2 bg-red-500 rounded hover:scale-105 transition">
          Reset System
        </button>

        <button className="px-4 py-2 bg-blue-500 rounded hover:scale-105 transition">
          Enable Alerts
        </button>
      </div>
    </div>
  );
};

export default Settings;
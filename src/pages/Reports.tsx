import Navbar from "@/components/Navbar";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { time: "10AM", alerts: 2 },
  { time: "11AM", alerts: 4 },
  { time: "12PM", alerts: 1 },
  { time: "1PM", alerts: 5 },
];

const Reports = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar isAlert={false} alertCount={0} />

      <div className="p-4">
        <h1 className="text-xl mb-4">Reports</h1>

        <LineChart width={600} height={300} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="alerts" />
        </LineChart>
      </div>
    </div>
  );
};

export default Reports;
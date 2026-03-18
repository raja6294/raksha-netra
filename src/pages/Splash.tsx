import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src="/logo.png" className="w-40 mb-6 cursor-pointer" />
      

      <button
        onClick={() => navigate("/connect")}
        className="px-6 py-3 bg-yellow-500 text-black rounded-lg"
      >
        Enter System
      </button>
    </div>
  );
};

export default Splash;
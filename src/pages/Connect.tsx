import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Connect = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (isConnecting) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [isConnecting]);

  return (
    <div
      className="h-screen w-full flex items-center justify-center bg-cover bg-center text-white relative"
      style={{ backgroundImage: "url('/connect.png')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center">

        {!isConnecting ? (
          // ✅ BUTTON VIEW
          <>
            <h2 className="text-3xl mb-6 font-bold">CCTV System</h2>

            <button
  onClick={() => setIsConnecting(true)}
  className="
    px-8 py-3 
    bg-yellow-500 text-black 
    rounded-xl 
    font-semibold
    shadow-md

    transition-all duration-300 ease-in-out

    hover:bg-yellow-400 
    hover:scale-105 
    hover:shadow-yellow-500/50 hover:shadow-lg

    active:scale-95
  "
>
  Connect to CCTV
</button>
          </>
        ) : (
          // ✅ CONNECTING VIEW
          <>
            <h2 className="text-2xl mb-4">Connecting to CCTV...</h2>
            <p className="mb-6">Please wait</p>

            {/* Loader */}
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </>
        )}

      </div>
    </div>
  );
};

export default Connect;
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

interface CameraContextType {
  cameraStream: MediaStream | null;
  startCamera: () => Promise<void>;
  stopCamera: () => void;
  isCameraActive: boolean;
}

const CameraContext = createContext<CameraContextType | undefined>(undefined);

export const CameraProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = useCallback(async () => {
    if (cameraStream) return; // Already running

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      setCameraStream(stream);
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      setIsCameraActive(false);
    }
  }, [cameraStream]);

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
      setIsCameraActive(false);
    }
  }, [cameraStream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't stop camera on unmount - keep it running across navigations
    };
  }, []);

  return (
    <CameraContext.Provider value={{ cameraStream, startCamera, stopCamera, isCameraActive }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCamera = () => {
  const context = useContext(CameraContext);
  if (context === undefined) {
    throw new Error("useCamera must be used within a CameraProvider");
  }
  return context;
};

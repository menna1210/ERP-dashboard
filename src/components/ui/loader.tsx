import { FaSpinner } from "react-icons/fa";

export default function LoadingScreen() {
  return (
    
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9999] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center gap-4">
        <FaSpinner className="animate-spin text-blue-600 text-5xl" />
        
      </div>
    </div>
  );
}
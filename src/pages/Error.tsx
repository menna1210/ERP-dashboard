import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 font-sans">
      
      <div className="relative flex justify-center items-center">
        <h1 className="text-9xl font-extrabold text-blue-600 tracking-tighter">404</h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute text-white font-bold">
          Page Not Found
        </div>
      </div>

      
      <div className="mt-8 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Oops! You're lost.
        </h3>
        <p className="text-gray-500 mb-8 max-w-md">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

      
        <div className="flex flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all shadow-lg active:scale-95"
          >
            Go Back
          </button>
          
         
        </div>
      </div>
    </div>
  );
}
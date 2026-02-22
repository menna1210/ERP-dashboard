import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

export default function LoginAuth() {
  return (
    <div className="mt-6">
      <div className="relative flex items-center justify-center mb-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="bg-white px-3 text-sm text-gray-500 absolute">Or continue with</span>
      </div>
      
      <div className="flex flex-col gap-3">
        <button className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all font-medium text-gray-700">
          <FcGoogle className="text-xl" />
          Google
        </button>
        
        <button className="flex items-center justify-center gap-3 w-full py-2.5 bg-[#1877F2] text-white rounded-lg hover:bg-blue-700 transition-all font-medium">
          <FaFacebook className="text-xl" />
          Facebook
        </button>
      </div>
    </div>
  );
}
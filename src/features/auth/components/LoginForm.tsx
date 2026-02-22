import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosConfig } from "../../../utils/axiosConfig";
import Loader from "../../../components/ui/loader"

interface Request {
  data: {
    id: number;
    name: string;
    phone: string; 
    email: string;
    token: string;
    permissions: string[];
  };
}

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading ,setLoading] =useState(false)
  const [fields, setFields] = useState({
    phone: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
   
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const request = await axiosConfig.post<Request>("/login", fields);

      if (request.status === 200 || request.status === 201) {
        const userToken = request.data.data.token;
        localStorage.setItem("userToken", userToken);
        console.log("Login Success! Token saved.");
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        alert("Error " + (error.response.data.message ||"Incorrect data"));
      } else {
        alert("Failed to connect server");
      }
    }
    finally{
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields({
      ...fields,
      [name]: value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">Phone number</label>
        <input
          name="phone" 
          type="text"
          placeholder="01xxxxxxxxx"
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-600">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          onChange={handleChange}
          disabled={loading}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        />
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-95"
        
      >
        LogIn
       {loading ? (
    <Loader  />
  ) : (
    ""
  )}
      </button>
    </form>
  );
}
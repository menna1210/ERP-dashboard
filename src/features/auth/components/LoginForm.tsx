import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { axiosConfig } from "../../../utils/axiosConfig";
import Button from "../../../components/ui/button"
import Input from "../../../components/ui/input"
import { FaPhone, FaLock, FaExclamationCircle } from "react-icons/fa";
interface Request {
  data :{
  token:string;
  }
}


export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 
  const [fields, setFields] = useState({
    phone: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
   
    try {
     const { data } = await axiosConfig.post<Request>("/login", fields);
     localStorage.setItem("userToken", data.data.token);
      navigate("/");
    } catch (error: AxiosError<{ message: string }>) {
const message = error.response?.data?.message || "رقم الهاتف أو كلمة المرور غير صحيحة";
      setErrorMsg(message);     
    } finally {
    setLoading(false);
    
  };}

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
        setFields((prev) => ({ ...prev, [name]: value }));
  };

  return (
 <form onSubmit={handleSubmit} className="flex flex-col gap-6" dir="rtl">
  
  <div className="space-y-2 group">
    <label className="text-slate-600 font-bold text-sm mr-1 transition-colors group-focus-within:text-blue-600">
      رقم الهاتف
    </label>
    <div className="relative">
      <Input
        name="phone"
        placeholder="01xxxxxxxxx"
        className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-slate-700"
        onChange={handleChange}
        disabled={loading}
        required
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <FaPhone size={18} />
      </div>
    </div>
  </div>

  <div className="space-y-2 group">
    <label className="text-slate-600 font-bold text-sm mr-1 transition-colors group-focus-within:text-blue-600">
      كلمة المرور
    </label>
    <div className="relative">
      <Input
        name="password"
        type="password"
        placeholder="••••••••"
        className="w-full pr-12 pl-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:bg-white focus:border-blue-500 transition-all outline-none font-bold text-slate-700"
        onChange={handleChange}
        disabled={loading}
        required
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <FaLock size={18} />
      </div>
    </div>
  </div>

  <Button 
    type="submit"
    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-lg shadow-blue-100 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-[0.98] disabled:bg-slate-300"
    loading={loading}
  >
    تسجيل الدخول
  </Button>

  {errorMsg && (
    <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-bold border border-red-100 flex items-center gap-3 animate-[shake_0.5s_ease-in-out]">
      <FaExclamationCircle size={18} className="shrink-0" />
      <span>{errorMsg}</span>
    </div>
  )}
</form>
  );
}
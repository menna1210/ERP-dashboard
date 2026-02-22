import LoginForm from "../components/LoginForm";
import LoginAuth from "../components/LoginAuth";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800">Welcome Back</h2>
          <p className="text-slate-400 mt-2">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <LoginForm />
        <LoginAuth />

        <div className="mt-8 text-center text-sm text-slate-400">
          Having trouble?{" "}
          <span className="text-blue-600 font-bold cursor-pointer underline">
            Contact Support
          </span>
        </div>
      </div>
    </div>
  );
}

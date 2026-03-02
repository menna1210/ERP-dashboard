import LoginForm from "../components/LoginForm";


export const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-800">اهلا بك مجددا</h2>
          <p className="text-slate-400 mt-2">
            أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك
          </p>
        </div>

        <LoginForm />
    

      
      </div>
    </div>
  );
}

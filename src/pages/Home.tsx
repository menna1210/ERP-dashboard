import { 
  FaExchangeAlt,
  FaChartLine, 
  FaMagic, 
  FaBoxes,       
  FaWarehouse   
} from "react-icons/fa"; 
import { useProducts } from "../features/products/hooks/useProduct";

export default function Home() {
  const { stats, loading } = useProducts();

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans" >
      <header className="bg-white border-b border-slate-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-slate-800 tracking-tight">نظرة عامة</h1>
            <p className="text-slate-500 text-sm">راقب نشاطك وإحصائيات المستودعات</p>
          </div>
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <FaMagic size={20} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-8">
        
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2rem] p-10 mb-10 shadow-xl shadow-blue-100/50">
          <div className="relative z-10">
            <h2 className="text-4xl font-bold text-white mb-3 flex items-center gap-3">
              أهلاً بك مجدداً! <FaMagic className="text-yellow-400 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]" />
            </h2>
            <p className="text-blue-100 text-lg opacity-90 max-w-lg leading-relaxed font-medium">
              كل شيء يبدو رائعاً اليوم. لقد أنجزت <span className="font-bold underline decoration-yellow-400 decoration-2 underline-offset-4">85%</span> من أهدافك الأسبوعية.
            </p>
          </div>
          <FaChartLine 
            size={220} 
            className="absolute left-[-30px] bottom-[-50px] text-white/10 -rotate-12 pointer-events-none" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {loading ? (
            <>
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-white border border-slate-100 rounded-3xl animate-pulse p-7 space-y-4">
                  <div className="w-14 h-14 bg-slate-100 rounded-2xl"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                  <div className="h-8 bg-slate-100 rounded w-3/4"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <FaBoxes size={26} />
                </div>
                <h3 className="text-slate-400 font-bold text-sm tracking-wide">إجمالي المنتجات</h3>
                <p className="text-4xl font-black text-slate-800 mt-2">{stats.products.toLocaleString()}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-green-600 font-bold bg-green-50 w-fit px-3 py-1 rounded-full">
                  <FaChartLine size={14} />
                  <span>+ 12% هذا الشهر</span>
                </div>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-500">
                  <FaExchangeAlt size={26} />
                </div>
                <h3 className="text-slate-400 font-bold text-sm tracking-wide">حركات النقل</h3>
                <p className="text-4xl font-black text-slate-800 mt-2">{stats.transfers}</p>
                <div className="mt-4 text-sm text-slate-400 flex items-center gap-2 font-bold">
                  <span>نشاط مرتفع</span>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-purple-500 h-full w-[85%]"></div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-7 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500">
                  <FaWarehouse size={26} />
                </div>
                <h3 className="text-slate-400 font-bold text-sm tracking-wide">عدد المخازن</h3>
                <p className="text-4xl font-black text-slate-800 mt-2">{stats.stores}</p>
                <div className="mt-4 flex items-center gap-2 text-sm text-orange-600 font-bold bg-orange-50 w-fit px-3 py-1 rounded-full">
                  <span>مستودعات نشطة</span>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}
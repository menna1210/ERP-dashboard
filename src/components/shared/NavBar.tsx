import { FaBars, FaBell, FaUser, FaSearch, FaThLarge } from "react-icons/fa";

export default function NavBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <nav className="h-[65px] bg-slate-900 text-white flex items-center justify-between px-6 shadow-md border-b border-slate-800 w-full sticky top-0 z-30 backdrop-blur-md bg-opacity-95">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick} 
          className="p-2 hover:bg-slate-800 rounded-xl transition-all active:scale-90 text-slate-400 hover:text-white"
        > 
          <FaBars size={20} /> 
        </button>

        {/* Logo Container */}
        <div className="flex items-center gap-3 border-l border-slate-700 pl-4 group cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20 group-hover:bg-blue-500 transition-colors">
            <FaThLarge size={16} />
          </div>
          <h3 className="text-lg font-bold tracking-tight hidden sm:block">
            Blue<span className="text-blue-500">Tech</span>
          </h3>
        </div>
      </div>

      <div className="hidden lg:flex items-center bg-slate-800/50 border border-slate-700 rounded-full px-4 py-1.5 w-72 focus-within:border-blue-500 transition-all focus-within:bg-slate-800">
        <FaSearch size={14} className="text-slate-500" />
        <input 
          type="text" 
          placeholder="Search..." 
          className="bg-transparent border-none focus:ring-0 text-sm ml-2 placeholder:text-slate-500 w-full outline-none"
        />
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-all relative">
          <FaBell size={18} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-700 ml-1 cursor-pointer group">
          <div className="hidden md:flex flex-col items-end leading-tight">
            <span className="text-[13px] font-semibold text-white group-hover:text-blue-400 transition-colors text-nowrap">Admin User</span>
          </div>
          <div className="w-9 h-9 bg-slate-800 rounded-full border border-slate-700 flex items-center justify-center group-hover:border-blue-500 transition-all overflow-hidden bg-gradient-to-tr from-slate-800 to-slate-700">
            <FaUser size={16} className="text-slate-400 group-hover:text-blue-400" />
          </div>
        </div>
      </div>
    </nav>
  );
}
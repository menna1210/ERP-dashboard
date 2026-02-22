import { 
  FaSignOutAlt, 
  FaThLarge, 
  FaTimes 
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { links } from "../../links/links"; 

interface LinkItem {
  id: number | string;
  title: string;
  path: string;
}

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideBar({ isOpen, onClose }: SideBarProps) {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose(); 
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={onClose}
      />

      <nav className={`fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out p-6 flex flex-col 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        
        <button 
          onClick={onClose} 
          className="absolute right-4 top-4 p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-all"
        >
          <FaTimes size={18} />
        </button>

        <div className="flex items-center gap-3 mb-10 mt-2 px-2">
          <div className="bg-blue-500 p-2 rounded-xl text-white shadow-lg shadow-blue-200">
            <FaThLarge size={20} />
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">Blue Tech</span>
        </div>

        <div className="flex-grow flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
          {links.map((link: LinkItem) => (
            <div key={link.id} className="flex flex-col">
              <button 
                onClick={() => handleNavigation(link.path)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-all font-medium group"
              >
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  {link.title}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 font-semibold hover:bg-red-50 rounded-2xl transition-all active:scale-95"
          >
            <FaSignOutAlt size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </nav>
    </>
  );
}
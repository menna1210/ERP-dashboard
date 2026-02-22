import { useState } from "react";
import Navbar from "../components/shared/NavBar";
import SideBar from "../components/shared/SideBar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={toggleSideBar} />

      <div className="flex flex-1 relative">
        <SideBar 
          isOpen={isSideBarOpen} 
          onClose={() => setIsSideBarOpen(false)} 
        />

        <main className="flex-1 p-5 bg-[#F8FAFC]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
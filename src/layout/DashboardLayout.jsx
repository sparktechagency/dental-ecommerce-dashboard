import { Outlet } from "react-router-dom";
import Header from "../components/LayoutComponents/Header";
import SideBar from "../components/LayoutComponents/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar - Fixed on large screens */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64 border-r border-gray-200 bg-gradient-to-b from-gray-800 to-gray-900">
          <SideBar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Sticky header */}
        <header className="bg-white shadow-sm z-10">
          <Header />
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

import { Outlet } from "react-router-dom";
import Header from "../components/LayoutComponents/Header";
import SideBar from "../components/LayoutComponents/SideBar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col h-[100dvh] bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-full mx-auto">
          <Header />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Fixed on large screens */}
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
            <SideBar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Content area */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-full h-[calc(100vh-64px)] mx-auto p-4 sm:p-6 md:p-8 w-full">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

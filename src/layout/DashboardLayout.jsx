import { Outlet } from "react-router-dom";
import Header from "../components/LayoutComponents/Header";
import SideBar from "../components/LayoutComponents/SideBar";

export default function DashboardLayout() {
  return (
    <main className="flex flex-col h-[100dvh] bg-[#202020]">
      <header className="bg-[#202020] border-b border-gray-700">
        <div className="max-w-full mx-auto">
          <Header />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="hidden lg:flex lg:flex-shrink-0">
          <div className="flex flex-col w-64 border-r border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900">
            <SideBar />
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-full h-[calc(100vh-64px)] mx-auto p-4 sm:p-6 md:p-8 w-full mb-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

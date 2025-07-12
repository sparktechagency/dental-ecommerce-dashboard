import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import EditProfile from "./EditProfile";
import ChangePass from "./ChangePass";
import PageHeading from "../../shared/PageHeading";

function ProfilePage() {
  const [activeTab, setActiveTab] = useState("editProfile");

  return (
    <div className="w-full overflow-y-auto">
      <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
        <PageHeading title="Admin Profile" />
        <div className="w-full md:max-w-4xl mx-auto">
          {/* Profile Picture Section */}
          <div className="flex flex-col items-center mt-4 sm:mt-6 bg-white bg-opacity-10 rounded-xl p-4 sm:p-6 w-full">
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-300 rounded-full border-4 border-white shadow-lg sm:shadow-xl flex justify-center items-center overflow-hidden">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  alt="profile"
                  className="w-full h-full object-cover"
                />
                {/* Upload Icon */}
                <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-white p-1.5 sm:p-2 rounded-full shadow-md cursor-pointer">
                  <label htmlFor="profilePicUpload" className="cursor-pointer">
                    <FaCamera className="text-[#136BFB] w-3 h-3 sm:w-4 sm:h-4" />
                  </label>
                  <input type="file" id="profilePicUpload" className="hidden" />
                </div>
              </div>
            </div>
            <div className="text-center mt-3 sm:mt-4">
              <p className="text-lg sm:text-2xl font-bold text-white">Shah Aman</p>
              <p className="text-sm sm:text-base text-gray-200">Super Admin</p>
            </div>
          </div>

          {/* Tab Navigation Section */}
          <div className="flex justify-center items-center gap-3 sm:gap-5 text-sm sm:text-base md:text-lg font-medium sm:font-semibold my-4 sm:my-6">
            <button
              onClick={() => setActiveTab("editProfile")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors ${
                activeTab === "editProfile"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("changePassword")}
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors ${
                activeTab === "changePassword"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              Change Password
            </button>
          </div>

          {/* Tab Content */}
          <div className="w-full max-w-2xl mx-auto">
            {activeTab === "editProfile" ? <EditProfile /> : <ChangePass />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
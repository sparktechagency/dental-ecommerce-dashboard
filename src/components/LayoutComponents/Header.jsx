import { LuBell } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { Drawer, Dropdown, Avatar } from "antd";
import { FaBars, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { IoIosLogOut, IoMdSettings } from "react-icons/io";
import { AdminItems } from "./SideBar";

const Header = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const navigate = useNavigate();
  const contentRef = useRef({});
  const [open, setOpen] = useState(false);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);
  const handleLogout = () => navigate("/login");

  const userMenu = (
    <div className="bg-gray-800 rounded-lg shadow-lg py-2 w-48">
      <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center">
        <IoMdSettings className="mr-2" />
        Settings
      </button>
      <button 
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center"
      >
        <IoIosLogOut className="mr-2" />
        Sign out
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={showDrawer}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>

          <div className="flex-1 flex items-center justify-end space-x-6">
            {/* Notifications */}
            <Link to="/notification">
            <button className="p-1 text-gray-400 hover:text-white relative">
              <LuBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            </Link>

            {/* User dropdown */}
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center space-x-3 cursor-pointer group">
                <Avatar 
                  size="default" 
                  className="bg-blue-500 text-white group-hover:bg-blue-600 transition-colors" 
                  icon={
                    <span className="font-medium">AD</span>
                  } 
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-200 group-hover:text-white">Admin User</p>
                  <p className="text-xs text-gray-400">Admin</p>
                </div>
                <FaChevronDown className="text-gray-400 text-xs group-hover:text-white transition-colors" />
              </div>
            </Dropdown>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Drawer
        title={
          <div className="flex items-center justify-center py-4">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-8" 
            />
          </div>
        }
        placement="left"
        width={280}
        onClose={onClose}
        open={open}
        className="mobile-sidebar"
        bodyStyle={{ padding: 0 }}
      >
        <div className="h-full overflow-y-auto bg-gray-800">
          {AdminItems.map((item) => (
            <div key={item.key} className="px-2 py-1">
              <Link
                to={item.link || '#'}
                className={`flex items-center px-4 py-3 text-sm rounded-lg mx-2 ${
                  selectedKey === item.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                    onClose();
                  }
                }}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.children && (
                  <FaChevronRight
                    className={`ml-2 transition-transform duration-200 ${
                      expandedKeys.includes(item.key) ? 'transform rotate-90' : ''
                    }`}
                  />
                )}
              </Link>

              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? 'my-1' : 'm-0'
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : '0',
                  }}
                  ref={(el) => (contentRef.current[item.key] = el)}
                >
                  <div className="ml-8 pl-2 border-l-2 border-gray-700 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.link}
                        className={`block px-3 py-2 text-sm rounded-md ${
                          selectedKey === child.key
                            ? 'bg-blue-600 text-white font-medium'
                            : 'text-gray-300 hover:bg-gray-700'
                        }`}
                        onClick={() => {
                          setSelectedKey(child.key);
                          onClose();
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Header;

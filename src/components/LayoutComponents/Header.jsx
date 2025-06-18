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
    <div className="bg-white rounded-lg shadow-lg py-2 w-48">
      <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
        <IoMdSettings className="mr-2" />
        Settings
      </button>
      <button 
        onClick={handleLogout}
        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
      >
        <IoIosLogOut className="mr-2" />
        Sign out
      </button>
    </div>
  );

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={showDrawer}
            className="lg:hidden text-gray-500 hover:text-gray-600 focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>

          <div className="flex-1 flex items-center justify-end space-x-4">
            {/* Notifications */}
            <button className="p-1 text-gray-400 hover:text-gray-500 relative">
              <LuBell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            {/* User dropdown */}
            <Dropdown overlay={userMenu} trigger={['click']} placement="bottomRight">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar 
                  size="default" 
                  className="bg-blue-500 text-white" 
                  icon={
                    <span>AD</span>
                  } 
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">Admin User</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
                <FaChevronDown className="text-gray-400 text-xs" />
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
        <div className="h-full overflow-y-auto">
          {AdminItems.map((item) => (
            <div key={item.key} className="px-2 py-1">
              <Link
                to={item.link || '#'}
                className={`flex items-center px-4 py-3 text-sm rounded-lg mx-2 ${
                  selectedKey === item.key
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
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
                  <div className="ml-8 pl-2 border-l-2 border-gray-200 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={child.link}
                        className={`block px-3 py-2 text-sm rounded-md ${
                          selectedKey === child.key
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-100'
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

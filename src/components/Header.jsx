import { LuBell } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { Drawer } from "antd";
import { FaBars, FaChevronRight } from "react-icons/fa";
import { MdDashboard, MdManageAccounts, MdOutlineAdminPanelSettings, MdOutlineArticle, MdOutlineDescription, MdOutlineEmail, MdOutlineImage, MdOutlineInventory2, MdOutlineLocalOffer, MdOutlineSettings, MdOutlineShoppingCart } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
// import { AdminItems } from "../SideBar";

export default function Header() {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const contentRef = useRef({});
  const [open, setOpen] = useState(false);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };


const AdminItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: MdDashboard,
      link: "/",
    },
    {
      key: "user-management",
      label: "User Management",
      icon: MdManageAccounts,
      children: [
        {
          key: "all-user",
          label: "All User",
          link: "/user/all-user",
          // icon: MdManageAccounts,
        },
        {
          key: "sign-up-request",
          label: "Sign Up Request",
          link: "/user/sign-up-request",
          // icon: LuBadgeCheck,
        },
      ],
    },
    {
      key: "order-management",
      label: "Order Management",
      icon: MdOutlineShoppingCart,
      link: "/order/all-order",
    },
    {
      key: "product-management",
      label: "Product Management",
      icon: MdOutlineInventory2,
      link: "/product/all-product",
    },
    {
      key: "category",
      label: "Category",
      icon: BiCategoryAlt,
      link: "/category",
    },
    {
      key: "brand",
      label: "Brand",
      icon: MdOutlineLocalOffer,
      link: "/brand",
    },
    {
      key: "procedure-guide",
      label: "Procedure Guide",
      icon: MdOutlineDescription,
      link: "/procedure-guide",
    },
    {
      key: "blog",
      label: "Blog",
      icon: MdOutlineArticle,
      link: "/blog",
    },
    {
      key: "newsletter",
      label: "Newsletter",
      icon: MdOutlineEmail,
      link: "/newsletter",
    },
    {
      key: "banner",
      label: "Banner",
      icon: MdOutlineImage,
      link: "/banner",
    },
    {
      key: "make-admin",
      label: "Make Admin",
      icon: MdOutlineAdminPanelSettings,
      link: "/make-admin",
    },
    {
      key: "settings",
      label: "Settings",
      icon: MdOutlineSettings,
      link: "/dashboard/Settings/profile",
      children: [
        {
          key: "profile",
          label: "Profile",
          link: "/dashboard/Settings/profile",
          // icon: FaUserCog
        },
        {
          key: "about-us",
          label: "About Us",
          link: "/about-us",
          // icon: MdOutlineInfo
        },
        {
          key: "terms",
          label: "Terms & Condition",
          link: "/dashboard/Settings/Terms&Condition",
          // icon: LuFileText
        },
        {
          key: "privacy-policy",
          label: "Privacy Policy",
          link: "/dashboard/Settings/PrivacyPolicy",
          // icon: MdOutlinePrivacyTip
        },
        {
          key: "contact-us",
          label: "Contact Us",
          link: "/dashboard/Settings/ContactUs",
          // icon: MdOutlineContactEmergency
        },
       
      ],
    },
  ];

  return (
    <>
      <header className="bg-[#202020] border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <FaBars className="h-6 w-6" />
          </button>
          <div className="flex-1 flex items-center justify-end space-x-6">
            <Link to="/notification">
              <button className="p-1 text-gray-400 hover:text-white relative">
                <LuBell className="h-8 w-8" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </button>
            </Link>

            <div className="flex items-center space-x-3 cursor-pointer group">
              <Link to="/dashboard/Settings/profile">
                <img
                  src="https://avatar.iran.liara.run/public/44"
                  alt="profile"
                  className="h-10 w-10 rounded-full"
                />
              </Link>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-200 group-hover:text-white">
                  Shah Aman
                </p>
                <p className="text-xs text-gray-400">Admin</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Drawer
        placement="left"
        width={280}
        open={open}
        rootClassName="custom-drawer"
        closeIcon={false}
      >
        <div className="p-6 mb-4 flex items-center justify-between">
          <img src="/logo.svg" alt="Logo" className="w-24 h-auto" />
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <FaChevronRight className="h-6 w-6" />
          </button>
        </div>
        <div className="h-full overflow-y-auto">
          {AdminItems.map((item) => (
            <div key={item.key} className="px-2 py-1">
              <Link
                to={item.link || "#"}
                className={`flex items-center px-4 py-3 text-sm rounded-lg mx-2 ${
                  selectedKey === item.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }`}
                onClick={(e) => {
                  if (item.children) {
                    e.preventDefault();
                    onParentClick(item.key);
                  } else {
                    setSelectedKey(item.key);
                    setOpen(false);
                  }
                }}
              >
                <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.children && (
                  <FaChevronRight
                    className={`ml-2 transition-transform duration-200 ${
                      expandedKeys.includes(item.key)
                        ? "transform rotate-90"
                        : ""
                    }`}
                  />
                )}
              </Link>

              {item.children && (
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    expandedKeys.includes(item.key) ? "my-1" : "m-0"
                  }`}
                  style={{
                    maxHeight: expandedKeys.includes(item.key)
                      ? `${contentRef.current[item.key]?.scrollHeight}px`
                      : "0",
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
                            ? "bg-blue-600 text-white font-medium"
                            : "text-gray-300 hover:bg-gray-700"
                        }`}
                        onClick={() => {
                          setSelectedKey(child.key);
                          setOpen(false);
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
}

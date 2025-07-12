import {
  MdDashboard,
  MdManageAccounts,
  MdOutlineCategory,
  MdOutlineArticle,
  MdOutlineEmail,
  MdOutlineImage,
  MdOutlineAdminPanelSettings,
  MdOutlineSettings,
  MdOutlineShoppingCart,
  MdOutlineInventory2,
  MdOutlineLocalOffer,
  MdOutlineDescription,
  MdOutlineInfo,
  MdOutlinePrivacyTip,
  MdOutlineQuestionAnswer,
  MdOutlineContactEmergency
} from "react-icons/md";
import { FaChevronRight, FaUserCog } from "react-icons/fa";
import { IoIosLogOut, IoMdNotificationsOutline } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { LuBadgeCheck, LuFileText } from "react-icons/lu";
import { BiCheckShield, BiCommand, BiCategoryAlt, BiNews } from "react-icons/bi";

export const AdminItems = [
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
        icon: MdManageAccounts,
      },
      {
        key: "sign-up-request",
        label: "Sign Up Request",
        link: "/user/sign-up-request",
        icon: LuBadgeCheck,
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
        icon: FaUserCog
      },
      {
        key: "about-us",
        label: "About Us",
        link: "/about-us",
        icon: MdOutlineInfo
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
        icon: LuFileText
      },
      {
        key: "privacy-policy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/Privacy&Policy",
        icon: MdOutlinePrivacyTip
      },
      {
        key: "contact-us",
        label: "Contact Us",
        link: "/dashboard/Settings/ContactUs",
        icon: MdOutlineContactEmergency
      },
     
    ],
  },
];

const SideBar = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [expandedKeys, setExpandedKeys] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const contentRef = useRef({});

  useEffect(() => {
    const currentPath = location.pathname;

    let activeParent = null;

    AdminItems.forEach((item) => {
      if (item.link === currentPath) {
        activeParent = item;
      } else if (
        item.children &&
        item.children.some((child) => child.link === currentPath)
      ) {
        activeParent = item;
      }
    });

    if (activeParent) {
      setSelectedKey(
        activeParent.children
          ? activeParent.children.find((child) => child.link === currentPath)
              ?.key || activeParent.key
          : activeParent.key
      );

      if (activeParent.children && !expandedKeys.includes(activeParent.key)) {
        setExpandedKeys([...expandedKeys, activeParent.key]);
      }
    }
  }, []);

  const onParentClick = (key) => {
    setExpandedKeys((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-full bg-[#202020]">
      <div className="p-6 mb-4">
        <img src="/logo.svg" alt="Logo" className="w-24 h-auto" />
      </div>

      {/* Scrollable menu items */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="px-4 space-y-1 pb-4">
          {AdminItems.map((item) => {
            const isActive =
              selectedKey === item.key ||
              (item.key === "settings" &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === "user-management" &&
                item.children?.some(
                  (child) => child.link === location.pathname
                ));

            return (
              <div key={item.key} className="mb-1">
                <Link
                  to={item.link || "#"}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault();
                      onParentClick(item.key);
                    } else {
                      setSelectedKey(item.key);
                    }
                  }}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left">{item.label}</span>
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
                      expandedKeys.includes(item.key) ? "my-2" : "m-0"
                    }`}
                    style={{
                      maxHeight: expandedKeys.includes(item.key)
                        ? `${contentRef.current[item.key]?.scrollHeight}px`
                        : "0",
                    }}
                    ref={(el) => (contentRef.current[item.key] = el)}
                  >
                    <div className="ml-6 pl-3 border-l-2 border-gray-600 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          to={child.link}
                          className={`block px-3 py-2 text-sm rounded-md transition-colors duration-150 ${
                            selectedKey === child.key
                              ? "bg-blue-600/30 text-blue-400 font-medium"
                              : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                          }`}
                          onClick={() => {
                            setSelectedKey(child.key);
                          }}
                        >
                          <child.icon className="w-5 h-5 mr-2 flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Logout button at the bottom */}
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-5 py-3 text-sm font-bold text-white bg-[#136BFB] rounded-lg transition-colors duration-200"
        >
          <IoIosLogOut className="w-5 h-5 mr-2 font-bold text-white" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;

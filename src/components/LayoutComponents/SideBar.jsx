import {
  MdDashboard,
  MdManageAccounts,
  MdOutlineCategory,
  MdOutlinePets,
} from "react-icons/md";
import { FaChevronRight, FaCog } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { TbHomeDollar } from "react-icons/tb";
import { LuBadgeCheck } from "react-icons/lu";
import { BiCheckShield, BiCommand } from "react-icons/bi";

export const AdminItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: MdDashboard,
    link: "/",
  },
  {
    key: "userManagement",
    label: "User management",
    icon: FaCog,
    children: [
      {
        key: "all-user",
        label: "All User",
        link: "/user/all-user",
      },
      {
        key: "sign-up-request",
        label: "Sign Up Request",
        link: "/user/sign-up-request",
      },
    ],
  },
  {
    key: "orderManagement",
    label: "Order Management",
    icon: MdOutlinePets,
    link: "/order/all-order",
  },
  {
    key: "productManagement",
    label: "Product Management",
    icon: MdOutlinePets,
    link: "/product/all-product",
  },
  {
    key: "categoryManagement",
    label: "Category",
    icon: MdOutlinePets,
    link: "/category",
  },
  {
    key: "brandManagement",
    label: "Brand",
    icon: MdOutlinePets,
    link: "/brand",
  },
  {
    key: "procedureGuide",
    label: "Procedure Guide",
    icon: MdOutlinePets,
    link: "/procedure-guide",
  },
  {
    key: "blog",
    label: "Blog",
    icon: MdOutlinePets,
    link: "/blog",
  },
  {
    key: "sellermanagement",
    label: "Business owners",
    icon: TbHomeDollar,
    link: "/dashboard/seller-management",
  },
  {
    key: "subscription",
    label: "Subscription",
    icon: LuBadgeCheck,
    link: "/dashboard/subscription",
  },
  {
    key: "premiumSubscribers",
    label: "Subscribers",
    icon: MdManageAccounts,
    link: "/premium-subscribers",
  },
  {
    key: "categorymanagement",
    label: "Category",
    icon: MdOutlineCategory,
    link: "/category-management",
  },
  {
    key: "bookingManagement",
    label: "Booking Management",
    icon: MdOutlineCategory,
    link: "/booking-management",
  },
  {
    key: "adPromotion",
    label: "Ads Promotion",
    icon: BiCommand,
    link: "/ads-promotion",
  },
  {
    key: "support",
    label: "Support",
    icon: BiCheckShield,
    link: "/support",
  },
  {
    key: "settings",
    label: "Settings",
    icon: FaCog,
    link: "/dashboard/Settings/profile",
    children: [
      {
        key: "profile",
        label: "Profile",
        link: "/dashboard/Settings/profile",
      },
      {
        key: "terms",
        label: "Terms & Condition",
        link: "/dashboard/Settings/Terms&Condition",
      },
      {
        key: "privacy",
        label: "Privacy Policy",
        link: "/dashboard/Settings/PrivacyPolicy",
      },
      {
        key: "faq",
        label: "Faq",
        link: "/faq",
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
    <div className="flex flex-col h-full">
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
              (item.key === "userManagement" &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === "creatorManagement" &&
                item.children?.some(
                  (child) => child.link === location.pathname
                )) ||
              (item.key === "categoriesManagement" &&
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
          className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors duration-200"
        >
          <IoIosLogOut className="w-5 h-5 mr-2" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;

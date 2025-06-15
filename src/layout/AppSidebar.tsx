import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaHorse,
 
  FaMoneyCheckAlt,
  FaUserFriends,
} from "react-icons/fa";
import SidebarWidget from "./SidebarWidget";
import { ChevronDownIcon } from "../icons";
import { useSidebar } from "../context/SidebarContext";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        {/* Dashboard icon */}
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 13h4v-2H3v2zm0 4h4v-2H3v2zm0-8h4V7H3v2zm6 8h8v-2h-8v2zm0-4h8v-2h-8v2zm0-6v2h8V7h-8z" />
        </svg>
      </span>
    ),
    name: "Dashboard",
    subItems: [
      { name: "Analyst", path: "/" },
    ],
  },
];

const yojnaItems: NavItem[] = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        <FaHorse />
      </span>
    ),
    name: "Yojnas",
    subItems: [
      { name: "List", path: "/yojna/list" }, // <-- Only List subitem
    ],
  },
];

const paymentsItems: NavItem[] = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        <FaMoneyCheckAlt />
      </span>
    ),
    name: "Payments",
    subItems: [
      { name: "Payment List", path: "/payments/list" },
    ],
  },
];

const customerItems: NavItem[] = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        <FaUserFriends />
      </span>
    ),
    name: "Yojna Registration (customer) ",
    subItems: [
      { name: "Customer List", path: "/customer/list" },
    ],
  },
];

const memberItems = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        <FaUserFriends />
      </span>
    ),
    name: "Member",
    subItems: [
      { name: "Member List", path: "/member/list" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "dashboard" | "yojna" | "payments" | "customer" | "member";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    ["dashboard", "yojna", "payments", "customer", "member"].forEach((menuType) => {
      const items =
        menuType === "dashboard"
          ? navItems
          : menuType === "yojna"
          ? yojnaItems
          : menuType === "payments"
          ? paymentsItems
          : menuType === "customer"
          ? customerItems
          : memberItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "dashboard" | "yojna" | "payments" | "customer" | "member",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "dashboard" | "yojna" | "payments" | "customer" | "member") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (
    items: NavItem[],
    menuType: "dashboard" | "yojna" | "payments" | "customer" | "member"
  ) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
                style={{
                  color:
                    openSubmenu?.type === menuType && openSubmenu?.index === index
                      ? "var(--pasuseva-green)"
                      : "var(--pasuseva-orange)",
                }}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-[#1f1f1f] text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-[var(--pasuseva-yellow1)] 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Section */}
      <div
        className={`py-8 flex ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {(isExpanded || isHovered || isMobileOpen) && (
            <img
              className="dark:hidden"
              src="/images/logo/pasuseva-logo1-removebg-preview.png"
              alt="Pasu Seva"
              width={120}
              height={40}
            />
          )}
          {(isExpanded || isHovered || isMobileOpen) && (
            <img
              className="hidden dark:block"
              src="\images\logo\pasuseva-logo2-removebg-preview.png"
              alt="Pasu Seva"
              width={120}
              height={40}
            />
          )}
        </Link>
      </div>

      {/* Navigation Section */}
      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            {/* Dashboard Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Dashboard
              </h2>
              {renderMenuItems(navItems, "dashboard")}
            </div>

            {/* Yojnas Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Yojnas
              </h2>
              {renderMenuItems(yojnaItems, "yojna")}
            </div>

            {/* Support Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Customer
              </h2>
              {renderMenuItems(customerItems, "customer")}
            </div>


            

            {/* MEMBER Section */}
              <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                MEMBER
              </h2>
              {renderMenuItems(memberItems, "member")}
            </div>

            {/* Payments Section */}
            <div>
              <h2
                className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                Payments
              </h2>
              {renderMenuItems(paymentsItems, "payments")}
            </div>
          </div>
        </nav>

        {/* Optional Widget */}
        {(isExpanded || isHovered || isMobileOpen) && <SidebarWidget />}
      </div>
    </aside>
  );
};

export default AppSidebar;

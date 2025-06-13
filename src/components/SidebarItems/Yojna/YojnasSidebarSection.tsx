import React from "react";
import { FaHorse } from "react-icons/fa";

const navItems = [
  {
    icon: (
      <span className="text-pasuseva-green group-hover:text-pasuseva-orange">
        <FaHorse />
      </span>
    ),
    name: "Yojnas",
    subItems: [
      { name: "Govt Schemes", path: "/yojna/govt" },
      { name: "Subsidies", path: "/yojna/subsidies" },
    ],
  },
];

const YojnasSidebarSection = (props: any) => (
  <div>
    <h2
      className={`mb-4 text-xs uppercase flex items-center gap-2 leading-[20px] text-black dark:text-white font-semibold ${
        !props.isExpanded && !props.isHovered ? "lg:justify-center" : "justify-start"
      }`}
    >
      Yojnas
    </h2>
    {props.renderMenuItems(navItems, "main")}
  </div>
);

export default YojnasSidebarSection;
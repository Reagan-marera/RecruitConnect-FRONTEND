import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
// import { NavLink } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab, tabs, isOpen }) => {
  console.log("Sidebar render", { activeTab, isOpen, tabs });

  return (
    
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-white w-64 min-h-screen overflow-y-auto fixed lg:static lg:translate-x-0 shadow-lg z-20"
    >
      <nav className="mt-8 px-4">
        {tabs.map((tab) => (
          <motion.button
            key={tab.label}
            whileHover={{ x: 5 }}
            onClick={() => setActiveTab(tab.label)}
            className={`flex items-center space-x-3 py-3 px-4 w-full rounded-lg transition-colors ${
              activeTab === tab.label
                ? "bg-indigo-600 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <tab.icon size={20} />
            <span className="text-sm font-medium">{tab.label}</span>
            {activeTab === tab.label && (
              <ChevronRight className="ml-auto" size={16} />
            )}
          </motion.button>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;

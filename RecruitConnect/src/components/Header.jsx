import React from "react";
import { motion } from "framer-motion";
import { PlusCircle, Bell, LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar, username, notificationCount }) => {
  const navigate = useNavigate(); // Initialize navigate function

  const handlePostJobClick = () => {
    navigate("/jobposting"); // Navigate to the JobPosting route
  };

  return (
    <header className="bg-white shadow-md px-6 py-4 sticky top-0 z-10">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSidebar}
            className="lg:hidden focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Menu
              className="text-gray-600 hover:text-indigo-600 transition-colors"
              size={24}
            />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Welcome back, {username}!
            </h2>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            aria-label="Post a New Job"
            onClick={handlePostJobClick}
          >
            <PlusCircle className="mr-2" size={18} />
            <span className="hidden sm:inline">Post a New Job</span>
          </motion.button>
          <div className="relative">
            <Bell
              className="text-gray-500 cursor-pointer hover:text-indigo-600 transition-colors"
              size={20}
              aria-label="Notifications"
            />
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                {notificationCount}
              </span>
            )}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex items-center text-gray-500 hover:text-indigo-600 transition-colors"
            aria-label="Logout"
            onClick={() => {
              // Handle logout logic here
            }}
          >
            <LogOut size={18} />
            <span className="ml-2 text-sm font-medium hidden sm:inline">
              Logout
            </span>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;

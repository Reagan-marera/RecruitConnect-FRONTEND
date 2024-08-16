import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Overview from "./Overview";
import CompanyProfile from "./CompanyProfile";
import JobListings from "./JobListings"; // Import JobListings component
import HelpCenter from "./HelpCenter"; // Import HelpCenter component
import {
  Home,
  Briefcase,
  Users,
  Building,
  BarChart2,
  MessageSquare,
  Calendar,
  FileText,
  HelpCircle,
} from "lucide-react";
import "../HelpCenter.css";

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [employerData, setEmployerData] = useState(null);
  const token = localStorage.getItem("token"); // token is stored in localStorage
  const employer_id = localStorage.getItem("employer_id");

  useEffect(() => {
    const fetchEmployerData = async () => {
      try {
        if (!employer_id || !token) {
          throw new Error("employer_id or token is missing");
        }

        const response = await axios.get(
          `https://recruitconnect-backend-mlpw.onrender.com/employers/${employer_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployerData(response.data);
      } catch (error) {
        console.error("Error fetching employer data:", error);
      }
    };

    fetchEmployerData();
  }, [employer_id, token]);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleProfileUpdate = (updatedProfile) => {
    setEmployerData(updatedProfile);
    localStorage.setItem("companyProfile", JSON.stringify(updatedProfile));
  };

  const tabs = [
    { icon: Home, label: "Overview" },
    { icon: Briefcase, label: "Job Listings" },
    { icon: Users, label: "Applicant Tracking" },
    { icon: Building, label: "Company Profile" },
    { icon: BarChart2, label: "Analytics" },
    { icon: MessageSquare, label: "Messages" },
    { icon: Calendar, label: "Schedule" },
    { icon: FileText, label: "Reports" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Overview":
        return <Overview stats={employerData?.stats} />;
      case "Job Listings":
        return <JobListings />; // Render the JobListings component when "Job Listings" is selected
      case "Company Profile":
        return (
          <CompanyProfile
            employer_id={employer_id}
            token={token}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      case "Help Center":
        return <HelpCenter />; // Render the HelpCenter component when "Help Center" is selected
      default:
        return <Overview stats={employerData?.stats} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        tabs={tabs}
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          employer={employerData}
          toggleSidebar={toggleSidebar}
          username={username}
        />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {activeTab}
              </h1>
              {renderContent()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployerDashboard;

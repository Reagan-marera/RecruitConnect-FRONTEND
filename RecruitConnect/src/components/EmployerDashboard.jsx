
// 


import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar"; // Ensure you have this component
import Header from "./Header"; // Ensure you have this component
import Overview from "./Overview"; // Ensure you have this component
import CompanyProfile from "./CompanyProfile"; // Ensure you have this component
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
} from "lucide-react"; // Ensure you have these icons

const EmployerDashboard = () => {
  const [activeTab, setActiveTab] = useState("Overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [employerData, setEmployerData] = useState(null);
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
  const employer_id = 1; // Replace with actual employer ID

  // retrieves the employer_id from the localStorage
  // const employer_id =localStorage.getItem("employer_id");

  useEffect(() => {
    
    const fetchEmployerData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/employers/${employer_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEmployerData(response.data.employer);
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
      case "Company Profile":
        return (
          <CompanyProfile
            employer_id={employer_id}
            token={token}
            onProfileUpdate={handleProfileUpdate}
          />
        );
      // ... other cases for different tabs
      // default:
      //   return <Overview stats={employerData?.stats} />;
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



// 









// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";
// import Sidebar from "./Sidebar"; // Ensure you have this component
// import Header from "./Header"; // Ensure you have this component
// import Overview from "./Overview"; // Ensure you have this component
// import CompanyProfile from "./CompanyProfile"; // Ensure you have this component
// import {
//   Home,
//   Briefcase,
//   Users,
//   Building,
//   BarChart2,
//   MessageSquare,
//   Calendar,
//   FileText,
//   HelpCircle,
// } from "lucide-react"; // Ensure you have these icons

// const EmployerDashboard = () => {
//   const [activeTab, setActiveTab] = useState("Overview");
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [username, setUsername] = useState("");
//   const [employerData, setEmployerData] = useState(null);
//   const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
//   const employer_id = localStorage.getItem("employer_id"); // Retrieve employer_id from localStorage

//   useEffect(() => {
//     const fetchEmployerData = async () => {
//       try {
//         const response = await axios.get(
//           `http://127.0.0.1:5000/employers/${employer_id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setEmployerData(response.data.employer);
//       } catch (error) {
//         console.error("Error fetching employer data:", error);
//       }
//     };

//     fetchEmployerData();
//   }, [employer_id, token]);

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("username");
//     if (storedUsername) {
//       setUsername(storedUsername);
//     }
//   }, []);

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   const handleProfileUpdate = (updatedProfile) => {
//     setEmployerData(updatedProfile);
//     localStorage.setItem("companyProfile", JSON.stringify(updatedProfile));
//   };

//   const tabs = [
//     { icon: Home, label: "Overview" },
//     { icon: Briefcase, label: "Job Listings" },
//     { icon: Users, label: "Applicant Tracking" },
//     { icon: Building, label: "Company Profile" },
//     { icon: BarChart2, label: "Analytics" },
//     { icon: MessageSquare, label: "Messages" },
//     { icon: Calendar, label: "Schedule" },
//     { icon: FileText, label: "Reports" },
//     { icon: HelpCircle, label: "Help Center" },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case "Overview":
//         return <Overview stats={employerData?.stats} />;
//       case "Company Profile":
//         return (
//           <CompanyProfile
//             employer_id={employer_id}
//             token={token}
//             onProfileUpdate={handleProfileUpdate}
//           />
//         );
//       // ... other cases for different tabs
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <Sidebar
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         tabs={tabs}
//         isOpen={isSidebarOpen}
//         toggleSidebar={toggleSidebar}
//       />
//       <div className="flex-1 flex flex-col overflow-hidden">
//         <Header
//           employer={employerData}
//           toggleSidebar={toggleSidebar}
//           username={username}
//         />
//         <main className="flex-1 overflow-y-auto bg-gray-50">
//           <div className="container mx-auto px-4 py-8">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//             >
//               <h1 className="text-3xl font-bold mb-6 text-gray-800">
//                 {activeTab}
//               </h1>
//               {renderContent()}
//             </motion.div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default EmployerDashboard;

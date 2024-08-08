import React, { useEffect, useState } from "react";
import axios from "axios";

const CompanyProfile = ({ employer_id, token, onProfileUpdate }) => {
  const [companyProfile, setCompanyProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyProfile = async () => {
      try {
        if (!employer_id || !token) {
          throw new Error("user_id or token is missing");
        }

        console.log(`Fetching company profile for user_id: ${employer_id}`);
        const response = await axios.get(
          `http://127.0.0.1:5000/company_profile/${employer_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("API Response:", response.data);
        setCompanyProfile(response.data);

        if (onProfileUpdate) {
          onProfileUpdate(response.data);
        }
      } catch (error) {
        console.error("Error fetching company profile:", error);
        setError(
          error.response?.data?.error || "Error fetching company profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyProfile();
  }, [employer_id, token, onProfileUpdate]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Company Profile</h1>
      <pre>{JSON.stringify(companyProfile, null, 2)}</pre>
    </div>
  );
};

export default CompanyProfile;




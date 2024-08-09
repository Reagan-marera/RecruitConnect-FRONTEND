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
          throw new Error("employer_id or token is missing");
        }

        console.log(`Fetching company profile for employer_id: ${employer_id}`);
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

  if (!companyProfile) {
    return <div>No company profile data available.</div>;
  }

  return (
    <div className="company-profile">
      <h1>{companyProfile.name}</h1>
      {companyProfile.picture_url && (
        <img
          src={companyProfile.picture_url}
          alt={`${companyProfile.name} logo`}
          className="company-logo"
        />
      )}
      <div className="profile-details">
        <p><strong>Address:</strong> {companyProfile.address}</p>
        <p><strong>Contact Email:</strong> <a href={`mailto:${companyProfile.contact_email}`}>{companyProfile.contact_email}</a></p>
        <p><strong>Phone Number:</strong> {companyProfile.phone_number}</p>
        <p><strong>Company Culture:</strong> {companyProfile.company_culture}</p>
        <p><strong>Job Openings:</strong> {companyProfile.job_openings}</p>
      </div>
    </div>
  );
};

export default CompanyProfile;




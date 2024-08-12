import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OnboardingWizard.css";

const OnboardingWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: "",
    phone_number: "",
    address: "",
    bio: "",
    resume: null,
    picture_url: null,
  });
  const [isProfileExisting, setIsProfileExisting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.data) {
          setFormData({
            username: response.data.username || "",
            phone_number: response.data.phone_number || "",
            address: response.data.address || "",
            bio: response.data.bio || "",
            resume: null,
            picture_url: null,
          });
          setIsProfileExisting(true);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const uploadFileToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gandia006");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dwjzz5aub/image/upload", 
      formData,
    //   {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   }
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pictureUrl = null;
    let resumeUrl = null;

    try {
      if (formData.picture_url) {
        pictureUrl = await uploadFileToCloudinary(formData.picture_url);
      }
      if (formData.resume) {
        resumeUrl = await uploadFileToCloudinary(formData.resume);
      }

      const dataToSubmit = {
        username: formData.username,
        phone_number: formData.phone_number,
        address: formData.address,
        bio: formData.bio,
        picture_url: pictureUrl,
        resume_url: resumeUrl,
        onboarding_complete: true, 
      };

      const url = isProfileExisting
        ? "http://127.0.0.1:5000/onboarding"
        : "http://127.0.0.1:5000/onboarding";

      const method = isProfileExisting ? "put" : "post";

      await axios({
        method: method,
        url: url,
        data: dataToSubmit,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/jobseeker"); // Redirect to the dashboard
    } catch (error) {
      console.error("Error creating/updating profile:", error.response?.data || error.message);
      
      alert("Failed to complete profile.Please try again.")
    }
  };

  return (
    <div className="onboarding-container">
      <h2>{isProfileExisting ? "Update Your Profile" : "Complete Your Profile"}</h2>
      <form onSubmit={handleSubmit} className="onboarding-form">
        {step === 1 && (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </label>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </label>
            <button type="button" onClick={handleBack}>
              Back
            </button>
            <button type="button" onClick={handleNext}>
              Next
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <label>
              Profile Picture:
              <input
                type="file"
                name="picture_url"
                onChange={handleFileChange}
              />
            </label>
            <label>
              Resume:
              <input
                type="file"
                name="resume"
                onChange={handleFileChange}
              />
            </label>
            <button type="button" onClick={handleBack}>
              Back
            </button>
            <button type="submit">
              {isProfileExisting ? "Update Profile" : "Finish"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default OnboardingWizard;

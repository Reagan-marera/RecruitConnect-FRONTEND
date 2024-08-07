import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const JobPostingForm = ({ employerId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company_name: '',
    contact_email: '',
    company_culture: '',
    job_openings: '',
    address: '',
    phone_number: '',
    picture_url: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token'); // Adjust token retrieval if needed
      const response = await axios.put(
        `http://localhost:8000/employers/${employerId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Employer updated successfully', response.data);
      navigate('/somepath'); // Adjust the path as needed
    } catch (error) {
      console.error('Error updating employer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Company Name</label>
        <input
          type="text"
          name="company_name"
          value={formData.company_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Contact Email</label>
        <input
          type="email"
          name="contact_email"
          value={formData.contact_email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Company Culture</label>
        <input
          type="text"
          name="company_culture"
          value={formData.company_culture}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Job Openings</label>
        <input
          type="text"
          name="job_openings"
          value={formData.job_openings}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Address</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Picture URL</label>
        <input
          type="url"
          name="picture_url"
          value={formData.picture_url}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update Employer</button>
    </form>
  );
};

export default JobPostingForm;

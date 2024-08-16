import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button } from '@mui/material';
import './Profile.css';

const steps = ['User Information', 'Profile Picture', 'Review & Submit'];

const Profile = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone_number: '',
    address: '',
    bio: '',
    profile_picture: '', 
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture' && files && files[0]) {
      setUser((prevUser) => ({
        ...prevUser,
        profile_picture: files[0],
      }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    if (!user.username || !user.email || !user.phone_number) {
      setError('Username, email, and phone number are required.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setError('');

    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('phone_number', user.phone_number);
    formData.append('address', user.address);
    formData.append('bio', user.bio);
    formData.append('profile_picture', user.profile_picture); 

    try {
      const response = await fetch('https://recruitconnect-backend-mlpw.onrender.com/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create profile');
      }

      const result = await response.json();
      setMessage('Profile created successfully!');
      setUser(result.user);

    } catch (error) {
      console.error('Error creating profile:', error);
      setError('An error occurred while creating the profile. Please try again.');
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <label>
              Username:
              <input
                type="text"
                name="username"
                value={user.username}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phone_number"
                value={user.phone_number}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={user.address}
                onChange={handleChange}
              />
            </label>
            <label>
              Bio:
              <textarea
                name="bio"
                value={user.bio}
                onChange={handleChange}
              ></textarea>
            </label>
          </>
        );
      case 1:
        return (
          <label>
            Profile Picture:
            <input
              type="file"
              name="profile_picture"
              onChange={handleChange}
            />
            {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
          </label>
        );
      case 2:
        return (
          <>
            <h3>Review your information:</h3>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {user.phone_number}</p>
            <p>Address: {user.address}</p>
            <p>Bio: {user.bio}</p>
            {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />}
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <div className="profile-container">
      <h2>Create Profile</h2>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <form onSubmit={handleSubmit}>
        {renderStepContent(activeStep)}
        <div className="buttons">
          {activeStep > 0 && (
            <Button onClick={handleBack}>
              Back
            </Button>
          )}
          <Button variant="contained" color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
          </Button>
        </div>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Profile;


import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
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
  const [preview, setPreview] = useState(null); // New state for image preview

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profile_picture' && files && files[0]) {
      setUser((prevUser) => ({
        ...prevUser,
        profile_picture: files[0],
      }));
      setPreview(URL.createObjectURL(files[0])); // Set preview URL
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      const response = await fetch('http://127.0.0.1:5000/profile', {
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

  return (
    <div className="profile-container">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
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
        <label>
          Profile Picture:
          <input
            type="file"
            name="profile_picture"
            onChange={handleChange}
          />
        </label>
        {preview && <img src={preview} alt="Profile Preview" className="profile-preview" />} {/* Image Preview */}
        <button type="submit">Create Profile</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Profile;

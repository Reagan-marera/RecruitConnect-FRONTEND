import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    profilePicture: ''
  });
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setUser(prevUser => ({
      ...prevUser,
      profilePicture: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('location', user.location);
    formData.append('bio', user.bio);
    if (user.profilePicture) {
      formData.append('profilePicture', user.profilePicture);
    }

    try {
      const response = await axios.put('http://127.0.0.1:5000/api/user', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Profile updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('An error occurred while updating the profile. Please try again.');
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {editMode ? (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={user.name} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={user.email} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="tel" name="phone" value={user.phone} onChange={handleChange} />
          </label>
          <label>
            Location:
            <input type="text" name="location" value={user.location} onChange={handleChange} />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={user.bio} onChange={handleChange}></textarea>
          </label>
          <label>
            Profile Picture:
            <input type="file" name="profilePicture" onChange={handleFileChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-view">
          <img src={user.profilePicture} alt="Profile" />
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;

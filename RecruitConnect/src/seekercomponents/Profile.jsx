import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
    resume: '',
    profilePicture: ''
  });
  const [message, setMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/user', {
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
    const { name, files } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('address', user.address);
    formData.append('bio', user.bio);
    if (user.profilePicture) {
      formData.append('profilePicture', user.profilePicture);
    }
    if (user.resume) {
      formData.append('resume', user.resume);
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/user', formData, {
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
            Username:
            <input type="text" name="username" value={user.username}
             onChange={handleChange} />
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
            Address:
            <input type="text" name="address" value={user.address} onChange={handleChange} />
          </label>
          <label>
            Bio:
            <textarea name="bio" value={user.bio} onChange={handleChange}></textarea>
          </label>
          <label>
            Profile Picture:
            <input type="file" name="profilePicture" onChange={handleFileChange} />
          </label>
          <label>
            Resume:
            <input type="file" name="resume" onChange={handleFileChange} />
          </label>
          <button type="submit">Save</button>
        </form>
      ) : (
        <div className="profile-view">
          {user.profilePicture && <img src={URL.createObjectURL(user.profilePicture)} alt="Profile" />}
          <p><strong>Username:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.location}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          {user.resume && <a href={URL.createObjectURL(user.resume)} target="_blank" rel="noopener noreferrer">View Resume</a>}
          <button onClick={() => setEditMode(true)}>Edit</button>
        </div>
      )}
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;

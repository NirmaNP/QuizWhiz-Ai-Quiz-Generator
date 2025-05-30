import React, { useState } from 'react';
import './Account.css'; // Assume basic styling (provided below)

const Account = () => {
  // Mock user data (replace with API calls later)
  const [user, setUser] = useState({
    displayName: 'John Doe',
    username: '@johndoe',
    joinDate: 'Jan 2023',
    avatarUrl: 'https://via.placeholder.com/150', // Placeholder image
    stats: {
      quizzesTaken: 42,
      highestScore: '95%',
      badges: ['Speed Demon', 'Trivia Master'],
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);

  // Handlers
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setUser({ ...user, avatarUrl: newAvatarUrl });
    }
  };

  const handleSaveName = () => {
    setUser({ ...user, displayName: newDisplayName });
    setIsEditing(false);
  };

  return (
    <div className="account-page">
      {/* Profile Section */}
      <div className="profile-section">
        <div className="avatar-container">
          <img src={user.avatarUrl} alt="Profile" className="avatar" />
          <input
            type="file"
            id="upload-avatar"
            accept="image/*"
            onChange={handleAvatarUpload}
            style={{ display: 'none' }}
          />
          <label htmlFor="upload-avatar" className="upload-label">
            Change Photo
          </label>
        </div>

        {isEditing ? (
          <div className="edit-name">
            <input
              type="text"
              value={newDisplayName}
              onChange={(e) => setNewDisplayName(e.target.value)}
            />
            <button onClick={handleSaveName}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <h2 onClick={() => setIsEditing(true)} className="editable">
            {user.displayName} ✏️
          </h2>
        )}

        <p className="username">{user.username}</p>
        <p className="join-date">Member since: {user.joinDate}</p>
      </div>

      {/* Stats Section */}
      <div className="stats-section">
        <h3>Your Stats</h3>
        <ul>
          <li>Quizzes Taken: <strong>{user.stats.quizzesTaken}</strong></li>
          <li>Highest Score: <strong>{user.stats.highestScore}</strong></li>
        </ul>

        <div className="badges">
          <h4>Badges:</h4>
          {user.stats.badges.map((badge, index) => (
            <span key={index} className="badge">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Settings Section */}
      <div className="settings-section">
        <h3>Settings</h3>
        <button className="btn">Change Password</button>
        <button className="btn">Notification Preferences</button>
        <button className="btn danger">Delete Account</button>
      </div>
    </div>
  );
};

export default Account;
import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onUserCreated }) => {
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', { username, points });
      setUsername('');
      setPoints(0);
      onUserCreated(response.data);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Points:
        <input type="number" value={points} onChange={(e) => setPoints(e.target.value)} required />
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default UserForm;

import React, { useState } from 'react';
import axios from 'axios';

const GroupForm = ({ users, onGroupCreated }) => {
  const [creator, setCreator] = useState('');
  const [members, setMembers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/groups', { creator, members });
      setCreator('');
      setMembers([]);
      onGroupCreated(response.data);
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Group</h2>
      <label>
        Creator:
        <select value={creator} onChange={(e) => setCreator(e.target.value)} required>
          <option value="">Select creator</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <label>
        Members:
        <select
          multiple
          value={members}
          onChange={(e) => setMembers(Array.from(e.target.selectedOptions, (option) => option.value))}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Create</button>
    </form>
  );
};

export default GroupForm;

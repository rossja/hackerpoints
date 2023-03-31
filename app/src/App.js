import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserForm from './UserForm';
import GroupForm from './GroupForm';


function App() {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchGroups = async () => {
    try {
      const response = await axios.get('http://localhost:3000/groups');
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleUserCreated = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const handleGroupCreated = (group) => {
    setGroups((prevGroups) => [...prevGroups, group]);
  };

  return (
    <div className="App">
      <UserForm onUserCreated={handleUserCreated} />
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.points} points
          </li>
        ))}
      </ul>
      <GroupForm users={users} onGroupCreated={handleGroupCreated} />
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group._id}>
            Creator: {group.creator.username}
            <ul>
              {group.members.map((member) => (
                <li key={member._id}>{member.username}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
import React, { createContext, useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
    color: ''
  });
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [teacherKey] = useState(localStorage.getItem('teacher_key'));
  const API_URL = import.meta.env.VITE_API_URL + import.meta.env.VITE_USERS_URI;

  const fetchUsers = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(() => {
      fetchUsers();
    }, 10000); // Poll every 10 secs
    return () => clearInterval(interval);
  }, []);

  const addUser = async (name) => {
    if (!name.trim()) return;

    const sanitized = DOMPurify.sanitize(name);
    const nameExists = users.some((user) => user.name.toLowerCase() === sanitized.toLowerCase());

    if (nameExists) {
      setAlert({
        show: true,
        message: 'This name already exists, try again.',
        type: 'error',
        color: 'gray',
      });
      return { status: 400, reason: 'Name already exists' };
    }

    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: sanitized }),
    });

    fetchUsers();
  };

  const updateUser = async (user) => {
    if (user) {
      const updatedUser = user.status === 'pending'
        ? { ...user, status: 'completed' }
        : user.status === 'completed'
          ? (({ status, ...rest }) => rest)(user)
          : { ...user, status: 'pending' };

      await fetch(`${API_URL}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });
    }

    fetchUsers();
  };

  const deleteUser = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchUsers();
  };

  const clearAlert = () => {
    setAlert({ show: false, message: '', type: '', color: '' });
  };

  return (
    <UserContext.Provider value={{
      users,
      addUser,
      name,
      setName,
      updateUser,
      deleteUser,
      teacherKey,
      alert,
      clearAlert
    }}>
      {children}
    </UserContext.Provider>
  );
};

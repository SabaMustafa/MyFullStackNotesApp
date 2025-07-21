import React from 'react';
import axios from 'axios';

const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://127.0.0.1:8000/logout/', {}, {
        headers: {
          Authorization: `Token ${token}`
        }
      });
      localStorage.removeItem('token');
      alert('Logout successful');
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
      Logout
    </button>
  );
};

export default LogoutButton;

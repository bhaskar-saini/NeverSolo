import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Chat Application</h1>
      <button onClick={() => navigate('/chat')}>Go to Chat</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

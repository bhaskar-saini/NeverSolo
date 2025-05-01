import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Chat from './components/Chat';
import './style.css';

const AppWrapper = () => {
  
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<Register navigate={navigate} />} />
      <Route path="/login" element={<Login navigate={navigate} />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
};

export default AppWrapper;

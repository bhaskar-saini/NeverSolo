import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Error state

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    try {
      await api.post('/users/register', { username, password });
      alert('Registered successfully');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <div className='out-body'>
      <div className='out-container'>
        <h1>Welcome to NeverSolo</h1>
        <h2>Register</h2>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error */}

        <button
          onClick={handleRegister}
          disabled={!username || !password} // Disable button if fields are empty
        >
          Register
        </button>

        <p>Already have an account?</p>
        <button onClick={() => navigate('/login')}>Sign In</button>
      </div>
    </div>
  );
};

export default Register;

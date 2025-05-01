import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import socket from '../socket';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');
  const [error, setError] = useState(''); 

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const filtered = res.data.filter(u => u._id !== userId);
      setUsers(filtered);
    } catch (err) {
      setError('Failed to fetch users');
      console.error(err);
    }
  };

  const selectUser = async (user) => {
    setReceiverId(user._id);
    setReceiverName(user.username);
    try {
      const res = await api.get(`/messages/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessages(res.data);
    } catch (err) {
      setError('Failed to load messages');
      console.error(err);
    }
  };

  const sendMessage = async () => {
    if (!receiverId || !content) {
      setError('Please select a user and type a message');
      return;
    }
    try {
      const res = await api.post(
        '/messages',
        { receiverId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      socket.emit('send_message', res.data);
      setMessages(prev => [...prev, res.data]);
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to send message');
      console.error(err);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUsers();

    socket.on('receive_message', (msg) => {
      if (msg.sender === receiverId || msg.receiver === receiverId) {
        setMessages(prev => [...prev, msg]);
      }
    });

    return () => socket.off('receive_message');
  }, [receiverId, token, navigate]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <h3>Select user to chat:</h3>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users available</p>
          ) : (
            users.map(user => (
              <button
                key={user._id}
                className={`user-btn ${receiverId === user._id ? 'active' : ''}`}
                onClick={() => selectUser(user)}
                >
                {user.username}
              </button>
            ))
          )}
      </div>
        {receiverId && (
        <>
          <h4>Chatting with: {receiverName}</h4>
          <div className="messages-container">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`message ${msg.sender === userId ? 'sent' : 'received'}`}
              >
                <strong>{msg.sender === userId ? 'You' : receiverName}:</strong> {msg.content}
              </div>
            ))}
          </div>
          <div className="input-section">
            <input
              className="message-input"
              placeholder="Type a message"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <button className="send-btn" onClick={sendMessage}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;

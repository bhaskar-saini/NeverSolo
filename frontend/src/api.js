import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : 'https://neversolo.onrender.com/api';

export default api;

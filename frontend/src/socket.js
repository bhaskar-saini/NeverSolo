import { io } from 'socket.io-client';

const URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://neversolo.onrender.com';

const socket = io(URL, {
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;

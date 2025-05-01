const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'https://neversolo.vercel.app',
        methods: ['GET', 'POST'],
        credentials: true
    }
});

app.use(cors({
    origin: 'https://neversolo.vercel.app',
    credentials: true
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

io.on('connection', socket => {
    console.log('User connected:', socket.id);

    socket.on('send_message', (data) =>{
        socket.broadcast.emit('receive_message', data);
    });

    socket.on('disconnect', ()=>{
        console.log('User disconnected');
    });
});

app.get("/", (req, res) => {
    res.send("NeverSolo API is Running!");
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})
# 🗨️ NeverSolo - Chat App

A real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js) and **Socket.IO** for instant messaging between users.

---

## 🚀 Features

- 🔐 User Authentication (JWT)
- 📧 Send and receive messages in real-time
- 👥 Select users to chat with
- 💬 Chat history between two users
- 🧼 Protected routes using token
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

- **Frontend**: React, Axios, React Router
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcryptjs
- **Realtime**: Socket.IO
- **Styling**: CSS

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/mern-chat-app.git
cd mern-chat-app
```
### 2. Setup Backend
```bash
cd backend
npm install
```
Create .env file and set up
```bash
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
```
Start the server: node server.js
### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev

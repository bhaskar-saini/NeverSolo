const express = require('express');
const Message = require('../models/Message');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { receiverId, content } = req.body;

  const newMessage = new Message({
    sender: req.user._id,
    receiver: receiverId,
    content
  });

  await newMessage.save();
  res.status(201).json(newMessage);
});

router.get('/:receiverId', authMiddleware, async (req, res) => {
  const { receiverId } = req.params;

  const messages = await Message.find({
    $or: [
      { sender: req.user._id, receiver: receiverId },
      { sender: receiverId, receiver: req.user._id }
    ]
  }).sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = router;

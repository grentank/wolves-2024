const express = require('express');
const { Message } = require('../../db/models');
const messagesRouter = express.Router();

messagesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allMessages = await Message.findAll({ order: [['id', 'DESC']] });
      res.json(allMessages);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Ошибка получения всех сообщений' });
    }
  })
  .post(async (req, res) => {
    try {
      const { signature, text } = req.body;
      if (!text) {
        return res.status(400).json({ text: 'Текст сообщения не может быть пустым' });
      }
      const newMessage = await Message.create({
        signature: !signature ? 'Аноним' : signature,
        text,
      });
      res.json(newMessage);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Ошибка создания нового сообщения' });
    }
  });

// DELETE /api/messages/5
messagesRouter.route('/:messageId').delete(async (req, res) => {
  try {
    const { messageId } = req.params;
    await Message.destroy({ where: { id: messageId } });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, text: 'Ошибка удаления сообщения' });
  }
}).get(async (req, res) => {
  try {
    const { messageId } = req.params;
    const message = await Message.findOne({ where: { id: messageId } });
    res.json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, text: 'Ошибка получения сообщения' });
  }
});

module.exports = messagesRouter;

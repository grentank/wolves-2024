const express = require('express');
const { Message, User } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');
const checkMessageAuthor = require('../middlewares/checkMessageAuthor');
const messagesRouter = express.Router();

messagesRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allMessages = await Message.findAll({
        order: [['id', 'DESC']],
        include: { model: User, attributes: ['id', 'name', 'email'] },
      });
      res.json(allMessages);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Ошибка получения всех сообщений' });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const { text } = req.body;
      if (!text) {
        return res.status(400).json({ text: 'Текст сообщения не может быть пустым' });
      }
      const newMessage = await Message.create({
        authorId: res.locals.user.id,
        text,
      });
      const newMessageWithUser = await Message.findOne({
        where: { id: newMessage.id },
        include: { model: User, attributes: ['id', 'name', 'email'] },
      });
      res.json(newMessageWithUser);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Ошибка создания нового сообщения' });
    }
  });

// DELETE /api/messages/5
messagesRouter
  .route('/:messageId')
  .delete(verifyAccessToken, checkMessageAuthor, async (req, res) => {
    try {
      const { messageId } = req.params;
      await Message.destroy({ where: { id: messageId } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, text: 'Ошибка удаления сообщения' });
    }
  })
  .patch(verifyAccessToken, checkMessageAuthor, async (req, res) => {
    try {
      const { messageId } = req.params;
      const { text } = req.body;
      const messageWithAuthor = await Message.findOne({
        where: { id: messageId },
        include: { model: User, attributes: ['id', 'name', 'email'] },
      });
      messageWithAuthor.text = text;
      await messageWithAuthor.save();
      return res.json(messageWithAuthor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message, text: 'Ошибка удаления сообщения' });
    }
  })
  .get(async (req, res) => {
    try {
      const { messageId } = req.params;
      const message = await Message.findOne({
        where: { id: messageId },
        include: { model: User, attributes: ['id', 'name', 'email'] },
      });
      res.json(message);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: error.message, text: 'Ошибка получения сообщения' });
    }
  });

module.exports = messagesRouter;

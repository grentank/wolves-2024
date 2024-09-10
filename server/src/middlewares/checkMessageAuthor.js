const { Message } = require('../../db/models');

async function checkMessageAuthor(req, res, next) {
  try {
    const { messageId } = req.params;
    const targetMessage = await Message.findByPk(messageId);
    if (res.locals.user.id === targetMessage.authorId) return next();
    return res.sendStatus(403);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}

module.exports = checkMessageAuthor;

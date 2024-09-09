const express = require('express');
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const generateTokens = require('../utils/generateTokens');
const cookieConfig = require('../configs/cookieConfig');
const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ text: 'Поля не заполнены' });
    }
    const hashpass = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, hashpass, name });

    const user = newUser.get();
    delete user.hashpass;
    const { accessToken, refreshToken } = generateTokens({ user });
    return res
      .cookie('refreshToken', refreshToken, cookieConfig)
      .json({ user, accessToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ text: 'Ошибка сервера', message: error.message });
  }
});

// bcrypt.compare

authRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = authRouter;

const express = require('express');
const morgan = require('morgan');
const messagesRouter = require('./routes/messagesRouter');
const authRouter = require('./routes/authRouter');
const tokensRouter = require('./routes/tokensRouter');
const cookieParser = require('cookie-parser');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api/tokens', tokensRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/auth', authRouter);

module.exports = app;

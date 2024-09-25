const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/products.router');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.router');
const tokensRouter = require('./routes/tokens.router');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.use('/api/tokens', tokensRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

module.exports = app;

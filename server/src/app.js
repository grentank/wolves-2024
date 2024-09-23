const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/products.router');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));

app.use('/api/products', productsRouter);

module.exports = app;

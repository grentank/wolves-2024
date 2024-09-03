const express = require('express');
const morgan = require('morgan');
const tracksRouter = require('./routes/tracksRouter');
const artistsRouter = require('./routes/artistsRouter');

const app = express();

app.use(morgan('dev'));
app.use(express.json()); // <-- парсинг JSON данных в req.body
// app.use(express.urlencoded({ extended: true })); // <-- парсинг URL-encoded данных в req.body
// app.use(multer()) // <--- multipart/form-data

app.use('/api/tracks', tracksRouter); // префикс для всех адресов роутера
app.use('/api/artists', artistsRouter);

module.exports = app;

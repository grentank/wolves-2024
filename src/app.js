const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { Wolf } = require('../db/models');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/api/wolves', async (req, res) => {
  const allWolves = await Wolf.findAll();
  res.json(allWolves); // res.send(allWolves)
});

app.get('/api/wolves/:id', async (req, res) => {
  // req.body = { ids: [] }
  try {
    const { id } = req.params;
    const oneWolf = await Wolf.findByPk(id);
    res.json(oneWolf);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
// GET /api/wolves/13
// GET /api/posts/17/comments

// app.get( => res.send(""))

app.post('/api/wolves', async (req, res) => {
  const { name, git, bonus = 0 } = req.body;
  if (!name || !git) {
    return res.status(500).send('Не хватает данных для создания волка');
  }
  const newWolf = await Wolf.create({ name, git, bonus });
  res.json(newWolf);
});

app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, 'index.html')))

module.exports = app;

const express = require('express');
const app = express();

app.get('/wolves', (req, res) => {
  const { age, name } = req.query;
  res.status(204).send(`Этому волку ${age} лет и его зовут ${name}`);
});

app.post('/name', (req, res) => {
  res.send('Ответ на POST-запрос');
});

app.listen(3000, () => console.log('Сервер стартанул на 3000'));

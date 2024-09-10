'use strict';

const { Message, User } = require('../models');
const { hashSync } = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      { name: 'Алекс', email: '1@1', hashpass: hashSync('123', 10) },
      { name: 'Макс', email: '2@2', hashpass: hashSync('123', 10) },
      { name: 'Андрей', email: '3@3', hashpass: hashSync('123', 10) },
      { name: 'Катя', email: '4@4', hashpass: hashSync('123', 10) },
      { name: 'Олег', email: '5@5', hashpass: hashSync('123', 10) },
    ]);

    await Message.bulkCreate([
      {
        text: 'Всем привет в этом чатике. Надеюсь, хоть тут люди нормальные.',
        authorId: 1,
      },
      { text: 'Привет! Нормальные? В этом чате? Ооо, ты явно новенький!', authorId: 2 },
      {
        text: 'Что нового? Ну, планета всё ещё вращается, так что есть время попить кофе.',
        authorId: 2,
      },
      {
        text: 'Нормально? Это как сказать "у меня всё плохо, но я не хочу об этом говорить".',
        authorId: 1,
      },
      {
        text: 'Всем привет. Сегодняшний день был настолько ужасен, что мне понравился.',
        authorId: 3,
      },
      {
        text: 'Привет. Надеюсь, вас всех устраивает мое отсутствие смысла жизни.',
        authorId: 4,
      },
      {
        text: 'Макс, как дела? Всё ещё пытаешься понять, что ты забыл в этой жизни?',
        authorId: 1,
      },
      { text: 'Моя жизнь — это как фильм. Только без сценария и смысла.', authorId: 3 },
      {
        text: 'Да у меня всё хорошо. Хотя на фоне мирового апокалипсиса это уже не так важно.',
        authorId: 2,
      },
      {
        text: 'Олег, ты пришёл сюда, чтобы добавить немного позитива в наше мрачное существование?',
        authorId: 4,
      },
      {
        text: 'Если бы жизнь была симуляцией, я бы давно удалил своё сохранение.',
        authorId: 5,
      },
      {
        text: 'Макс, ты когда-нибудь задумывался о том, что мы здесь просто для статистики?',
        authorId: 3,
      },
      {
        text: 'Андрей, ты сегодня такой позитивный. Тебя кто-то наконец-то уволил?',
        authorId: 5,
      },
      {
        text: 'Нет, меня не уволили, просто понял, что надежда — это переоценённое чувство.',
        authorId: 3,
      },
      {
        text: 'Иногда мне кажется, что мы просто тренируемся к большой ошибке в будущем.',
        authorId: 2,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

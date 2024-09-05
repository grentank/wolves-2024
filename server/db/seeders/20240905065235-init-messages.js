'use strict';

const { Message } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Message.bulkCreate([
      { text: 'Всем привет в этом чатике', signature: 'Chickenkiller' },
      { text: 'Привет, как дела?', signature: 'Вася' },
      { text: 'Что нового?', signature: 'Петя' },
      { text: 'Нормально', signature: 'Вася' },
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

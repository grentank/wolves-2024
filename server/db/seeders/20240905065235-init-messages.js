'use strict';

const { Message } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await Message.bulkCreate([
      { text: 'Всем привет в этом чатике', authorId: null },
      { text: 'Привет, как дела?', authorId: null },
      { text: 'Что нового?', authorId: null },
      { text: 'Нормально', authorId: null },
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

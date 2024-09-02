'use strict';

const { Wolf } = require('../models');
const fs = require('fs/promises');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fileData = await fs.readFile('./db/studentsData.txt', 'utf8');
    const keys = ['name', 'repeat', 'email', 'git', 'tg', 'bonus'];
    const dataArray = fileData
      .split('\n')
      .map((row) => row.split('\t').reduce((a, e, i) => ({ ...a, [keys[i]]: e }), {}));
    await Wolf.bulkCreate(
      dataArray.map(({ name, git, bonus }) => ({ name, git, bonus })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wolves', null, {});
  },
};

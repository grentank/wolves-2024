'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TracksArtists', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      trackId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Tracks',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      artistId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Artists',
          },
          key: 'id',
        },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TracksArtists');
  },
};

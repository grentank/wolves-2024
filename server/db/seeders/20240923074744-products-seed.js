'use strict';

const { Product } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const products = await fetch('https://dummyjson.com/products').then((r) => r.json());
    await Product.bulkCreate(
      products.products.map((p) => ({
        title: p.title,
        description: p.description,
        price: p.price,
        image: p.images[0],
      })),
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, {});
  },
};

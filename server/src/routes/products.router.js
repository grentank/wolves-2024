const express = require('express');
const productService = require('../services/product.service');

const productsRouter = express.Router();

productsRouter.route('/').get(async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message, text: 'Ошибка получения товаров' });
  }
});

module.exports = productsRouter;

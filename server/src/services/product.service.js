const models = require('../../db/models');

class ProductService {
  #models;

  // Dependency injection
  constructor(dbModels) {
    this.#models = dbModels;
  }

  getProducts() {
    return this.#models.Product.findAll();
  }
}

const productService = new ProductService(models);

module.exports = productService;

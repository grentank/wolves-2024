const models = require('../../db/models');

class ProductService {
  #models;

  // Dependency injection
  constructor(dbModels) {
    this.#models = dbModels;
  }

  getProducts() {
    return this.#models.Product.findAll({ order: [['id', 'desc']] });
  }

  createProduct(data) {
    return this.#models.Product.create(data);
  }

  deleteProduct(id) {
    return this.#models.Product.destroy({ where: { id } });
  }
}

const productService = new ProductService(models);

module.exports = productService;

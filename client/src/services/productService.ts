import type { AxiosInstance } from 'axios';
import { ZodError } from 'zod';
import { productSchema, type ProductT } from '../schemas/productSchema';
import axiosInstance from './axiosInstance';

class ProductService {
  // Dependency Injection
  constructor(private readonly client: AxiosInstance) {}

  async getProducts(): Promise<ProductT[]> {
    try {
      const response = await this.client('/products');
      if (response.status !== 200) throw new Error('Неверный статус получения товаров');
      return productSchema.array().parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('ZOD ERROR', error.issues);
      } else {
        console.log('Ошибка получения товаров в сервисе', error);
      }
      return Promise.reject(error);
    }
  }
}

const productService = new ProductService(axiosInstance);

export default productService;

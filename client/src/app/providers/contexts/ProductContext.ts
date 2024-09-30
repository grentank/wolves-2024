import { createContext, useContext } from 'react';
import type { ProductContextValue } from '../../schemas/productSchema';

const ProductContext = createContext<ProductContextValue | null>(null);

export function useProducts(): ProductContextValue {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}

export default ProductContext;

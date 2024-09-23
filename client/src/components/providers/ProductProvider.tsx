import React, { useEffect, useReducer, useState } from 'react';
import ProductContext from './ProductContext';
import productService from '../../services/productService';
import type { ProductsActionT, ProductT } from '../../schemas/productSchema';
import productsReducer from './productsReducer';

type ProductProviderProps = {
  children: JSX.Element;
};

export default function ProductProvider({ children }: ProductProviderProps): JSX.Element {
  //   const [products, setProducts] = useState<ProductT[]>([]);
  const [products, dispatch] = useReducer(productsReducer, []);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    productService
      .getProducts()
      .then((data) => {
        const action: ProductsActionT = { type: 'SET_PRODUCTS', payload: data };
        dispatch(action);
      })
      .catch((err) => err instanceof Error && setError(err?.message))
      .finally(() => setLoading(false));
  }, []);
  return (
    <ProductContext.Provider value={{ products, error }}>
      {children}
    </ProductContext.Provider>
  );
}

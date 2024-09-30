import React, { useCallback, useEffect, useReducer, useState } from 'react';
import ProductContext from './ProductContext';
import productService from '../../services/productService';
import { productFormSchema } from '../../schemas/productSchema';
import type {
  DeleteProductHandler,
  ProductsActionT,
  SubmitProductHandler,
} from '../../schemas/productSchema';
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

  /// Описываем обработчики
  const submitHandler: SubmitProductHandler = useCallback(async (e) => {
    try {
      e.preventDefault();
      const formData = productFormSchema.parse(
        Object.fromEntries(new FormData(e.currentTarget)),
      );
      const newProduct = await productService.createProduct(formData);
      const action: ProductsActionT = { type: 'ADD_PRODUCT', payload: newProduct };
      dispatch(action);
    } catch (err) {
      console.log(err);
      if (err instanceof Error) setError(err?.message);
    }
  }, []);
  const deleteHandler: DeleteProductHandler = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      const action: ProductsActionT = { type: 'DELETE_PRODUCT', payload: productId };
      dispatch(action);
    } catch (err) {
      if (err instanceof Error) setError(err?.message);
    }
  };
  return (
    <ProductContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{ products, error, loading, submitHandler, deleteHandler }}
    >
      {children}
    </ProductContext.Provider>
  );
}

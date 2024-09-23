import { z } from 'zod';

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  price: z.number(),
  createdAt: z.string().datetime(),
});

export type ProductT = z.infer<typeof productSchema>;

export type ProductContextValue = {
  products: ProductT[];
  error: string | null;
};

export type ProductsActionT =
  | { type: 'SET_PRODUCTS'; payload: ProductT[] }
  | { type: 'DELETE_PRODUCT'; payload: ProductT['id'] }
  | { type: 'REVERSE_ORDER' }
  | { type: 'SORT_BY'; payload: keyof ProductT }
  | { type: 'ADD_PRODUCT'; payload: ProductT };

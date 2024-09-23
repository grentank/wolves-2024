import type { ProductsActionT, ProductT } from '../../schemas/productSchema';

export default function productsReducer(
  state: ProductT[],
  action: ProductsActionT,
): ProductT[] {
  const { type } = action;
  switch (type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      return [action.payload, ...state];
    case 'REVERSE_ORDER':
      return state.toReversed();
    default:
      return state;
  }
}

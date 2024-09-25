import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ProductSliceT, ProductT } from '../../../schemas/productSchema';
import {
  deleteProductThunk,
  loadAllProductsThunk,
  sendProductFormThunk,
} from './productThunks';

const initialState: ProductSliceT = {
  items: [],
  error: null,
  loading: true,
  favorites: [],
  chosenProduct: null,
  sort: {
    key: 'id',
    order: 'desc',
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reverseSort: (state) => {
      if (state.sort.order === 'asc') state.sort.order = 'desc';
      else state.sort.order = 'asc';
      //   state.sort.order = state.sort.order === 'asc' ? 'desc' : 'asc';
    },
    resetSort: (state) => {
      state.sort = {
        key: 'id',
        order: 'desc',
      };
    },
    setSortKey: (state, action: PayloadAction<'id' | 'price'>) => {
      state.sort.key = action.payload;
    },
    setChosenProduct: (state, action: PayloadAction<ProductT>) => {
      state.chosenProduct = action.payload;
    },
    addToFavorites: (state, action: PayloadAction<ProductT>) => {
      const indexInFavs = state.favorites.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (indexInFavs === -1) state.favorites.unshift(action.payload);
      else state.favorites.splice(indexInFavs, 1);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadAllProductsThunk.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(loadAllProductsThunk.rejected, (state) => {
        state.error = 'Ошибка подгрузки товаров';
        state.loading = false;
      })
      .addCase(sendProductFormThunk.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(sendProductFormThunk.rejected, (state) => {
        state.error = 'Ошибка добавления товара';
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductThunk.rejected, (state) => {
        state.error = `Ошибка удаления товара`;
      });
  },
});

// Action creators are generated for each case reducer function
export const {
  reverseSort,
  setSortKey,
  resetSort,
  setChosenProduct,
  addToFavorites,
  setError,
} = productSlice.actions;

export default productSlice.reducer;

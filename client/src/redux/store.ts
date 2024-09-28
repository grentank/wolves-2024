import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product/productSlice';
import authReducer from './slices/auth/authSlice';
import notificationReducer from './slices/notification/notificationSlice';
import { productApi } from './api/productApi';

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    notification: notificationReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

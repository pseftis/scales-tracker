import { configureStore } from '@reduxjs/toolkit';
import salesReducer from './salesSlice';
import productsReducer from './productsSlice';

export const store = configureStore({
  reducer: {
    sales: salesReducer,
    products: productsReducer,
  },
});
import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { constructorReducer } from './slices/constructorSlice';
import {
  ingredientsReducer,
  IngredientsSlice
} from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { authReducer, registerReducer } from './slices/profileSlice';
import { feedReducer } from './slices/feedSlice';

const rootReducer = {
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer,
  orderSlice: orderReducer,
  registerSlice: registerReducer,
  authSlice: authReducer,
  feedSlice: feedReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

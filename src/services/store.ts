import { configureStore } from '@reduxjs/toolkit';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { ingredientsReducer } from './slices/ingredients-slice/ingredientsSlice';
import { constructorReducer } from './slices/constructor-slice/constructorSlice';
import {
  orderReducer,
  profileOrderFeedReducer
} from './slices/order-slice/orderSlice';
import { profileReducer } from './slices/profile-slice/profileSlice';
import { feedReducer } from './slices/feed-slice/feedSlice';

const rootReducer = {
  ingredientsSlice: ingredientsReducer,
  constructorSlice: constructorReducer,
  orderSlice: orderReducer,
  profileSlice: profileReducer,
  feedSlice: feedReducer,
  profileOrderFeedReducer: profileOrderFeedReducer
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

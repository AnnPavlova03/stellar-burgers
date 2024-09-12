import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerConstructorSlice } from './burgerConstructor/burger';
import { userSlice } from './user/userSlice';
import { orderSlice } from './order/order';
import { userOrderSlice } from './orderUser/orderUser';

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  userOrder: userOrderSlice.reducer
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;

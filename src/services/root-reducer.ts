import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients-slice';
import { burgerConstructorReducer } from './slices/burger-сonstructor-slice';
import { orderReducer } from './slices/order-slice';
import { authReducer } from './slices/auth-slice';
import { feedReducer } from './slices/feed-slice';
import { profileOrdersReducer } from './slices/profile-orders-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

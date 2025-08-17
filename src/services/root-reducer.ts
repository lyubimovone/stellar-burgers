import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients';
import { userReducer } from './slices/user';
import { burgerConstructorReducer } from './slices/burger-constructor';
import { feedReducer } from './slices/feed';
import { orderReducer } from './slices/order';
import { profileOrdersReducer } from './slices/profile-orders';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  feed: feedReducer,
  order: orderReducer,
  profileOrders: profileOrdersReducer
});

export type RootState = ReturnType<typeof rootReducer>;

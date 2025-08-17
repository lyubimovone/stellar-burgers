import { RootState } from '../store';
import { TConstructorIngredient } from '@utils-types';

export const selectConstructorBun = (state: RootState) =>
  state.burgerConstructor.bun;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;

export const selectConstructor = (state: RootState) => state.burgerConstructor;

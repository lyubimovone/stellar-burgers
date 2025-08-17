import { RootState } from '../store';
import { TIngredient } from '@utils-types';
import { createSelector } from '@reduxjs/toolkit';

export const selectIngredients = (state: RootState): TIngredient[] =>
  state.ingredients.items;

export const selectIsIngredientsLoading = (state: RootState): boolean =>
  state.ingredients.isLoading;

const selectIngredientsItems = (state: RootState): TIngredient[] =>
  state.ingredients.items;

export const selectBuns = createSelector([selectIngredientsItems], (items) =>
  items.filter((item) => item.type === 'bun')
);

export const selectSauces = createSelector([selectIngredientsItems], (items) =>
  items.filter((item) => item.type === 'sauce')
);

export const selectMains = createSelector([selectIngredientsItems], (items) =>
  items.filter((item) => item.type === 'main')
);

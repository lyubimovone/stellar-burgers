import { RootState } from '../store';

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;

export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

export const selectIngredientById = (
  state: RootState,
  id: string | undefined
) => {
  if (!id) return null;
  return state.ingredients.ingredients.find((ing) => ing._id === id);
};

export const getIngredientsState = (state: RootState) => state.ingredients;

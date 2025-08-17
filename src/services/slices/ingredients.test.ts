import { ingredientsReducer, fetchIngredients } from './ingredients';
import { TIngredient } from '../../utils/types';

describe('ingredients slice', () => {
  const initialState = { items: [], isLoading: false, hasError: false };

  it('handles pending', () => {
    const state = ingredientsReducer(initialState, fetchIngredients.pending('', undefined));
    expect(state.isLoading).toBe(true);
    expect(state.hasError).toBe(false);
  });

  it('handles fulfilled', () => {
    const items: TIngredient[] = [
      { _id: '1', name: 'item', type: 'bun', proteins: 0, fat: 0, carbohydrates: 0, calories: 0, price: 0, image: '', image_large: '', image_mobile: '' }
    ];
    const state = ingredientsReducer(initialState, fetchIngredients.fulfilled(items, '', undefined));
    expect(state.items).toEqual(items);
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(false);
  });

  it('handles rejected', () => {
    const state = ingredientsReducer(initialState, fetchIngredients.rejected(new Error('fail'), '', undefined));
    expect(state.isLoading).toBe(false);
    expect(state.hasError).toBe(true);
  });
});
